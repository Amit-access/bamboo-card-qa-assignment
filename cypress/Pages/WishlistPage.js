// cypress/pages/WishlistPage.js
class WishlistPage {
    elements = {
        wishlistItems: () => cy.get('.products-grid.wishlist .product-items .product-item'),
        addAllToCartButton: () => cy.get('[data-role="all-tocart"]'),
        removeItemButton: () => cy.get('.btn-remove'),
        successMessage: () => cy.get('[data-ui-id="message-success"]')
    }

    verifyWishlistItem(productName) {
        cy.get('.product-item-link')
            .contains(productName)
            .should('be.visible');
    }

    addAllToCart() {
        this.elements.addAllToCartButton()
            .should('be.visible')
            .click();

        // Wait for success message
        this.elements.successMessage()
            .should('be.visible')
            //.and('contain', 'have been added to your shopping cart');
    }

    clearWishlist() {
        cy.get('body').then(($body) => {
            if ($body.find('.product-item').length > 0) {
                cy.get('.btn-remove').each(($removeButton) => {
                    cy.wrap($removeButton).click();
                    cy.wait(1000);
                });
            }
        });
    }
}

export default new WishlistPage();