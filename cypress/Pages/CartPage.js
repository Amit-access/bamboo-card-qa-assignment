// cypress/pages/CartPage.js
class CartPage {
    elements = {
        cartItems: () => cy.get('.cart.items'),
        cartItem: (productName) => cy.get('.cart.item').filter(`:contains("${productName}")`),
        basePrice: (productName) => this.elements.cartItem(productName).find('.cart-price .price'),
        subtotalPrice: (productName) => this.elements.cartItem(productName).find('.subtotal .price'),
        itemQuantity: (productName) => this.elements.cartItem(productName).find('.input-text.qty'),
        itemSubtotal1: () => cy.get('.cart.item').first().find('.subtotal .price'),
        itemSubtotal2: () => cy.get('.cart.item').last().find('.subtotal .price'),
        orderTotal: () => cy.get('[data-th="Order Total"] .price'),
        pageTitle: () => cy.get('.page-title'),
         // Add checkout button selectors
         checkoutButton: () => cy.get('button[data-role="proceed-to-checkout"]'),
         miniCartCheckoutButton: () => cy.get('#top-cart-btn-checkout')
    }

    proceedToCheckout() {
        // Wait for checkout button to be clickable
        this.elements.checkoutButton()
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        // Wait for checkout page to load
        cy.url().should('include', '/checkout');
        
        // Verify we're on checkout page
        cy.get('.checkout-title')
            .should('be.visible')
            .and('contain', 'Checkout');
    }

    proceedToCheckoutFromMiniCart() {
        // Click cart icon
        cy.get('.showcart').click();
        
        // Wait for mini cart to load
        cy.wait(1000);
        
        // Click checkout in mini cart
        this.elements.miniCartCheckoutButton()
            .should('be.visible')
            .click();

        // Verify we're on checkout page
        cy.url().should('include', '/checkout');
        cy.get('.checkout-title')
            .should('be.visible')
            .and('contain', 'Checkout');
    }

    verifyMultipleItems(items) {
        // Wait for cart page to load completely
        this.elements.pageTitle()
            .should('be.visible')
            .and('contain', 'Shopping Cart');

        // Wait for cart items to be visible
        cy.get('.cart.item').should('have.length', 2);

        // Get first subtotal
        this.elements.itemSubtotal1()
            .should('be.visible')
            .invoke('text')
            .then((subtotalText1) => {
                const subtotal1 = parseFloat(subtotalText1.replace('$', '').trim());
                cy.log(`First Item Subtotal: $${subtotal1}`); // Should be $44.00

                // Get second subtotal
                this.elements.itemSubtotal2()
                    .should('be.visible')
                    .invoke('text')
                    .then((subtotalText2) => {
                        const subtotal2 = parseFloat(subtotalText2.replace('$', '').trim());
                        cy.log(`Second Item Subtotal: $${subtotal2}`); // Should be $34.00

                        // Calculate total
                        const calculatedTotal = subtotal1 + subtotal2;
                        cy.log(`Calculated Total: $${subtotal1} + $${subtotal2} = $${calculatedTotal}`); // Should be $78.00

                        // Verify Order Total matches calculated total
                        this.elements.orderTotal()
                            .should('be.visible')
                            .invoke('text')
                            .then((orderTotalText) => {
                                const orderTotal = parseFloat(orderTotalText.replace('$', '').trim());
                                cy.log(`Order Total: $${orderTotal}`);
                                expect(orderTotal).to.equal(calculatedTotal);
                            });
                    });
            });
    }
}

export default new CartPage();