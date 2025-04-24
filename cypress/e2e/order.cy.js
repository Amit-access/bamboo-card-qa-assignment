// cypress/e2e/order.cy.js
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

describe('Place Order with Multiple Products', () => {
    const products = {
        radiantTee: {
            url: '/radiant-tee.html',
            name: 'Radiant Tee',
            size: 'M',
            color: 'Blue',
            quantity: 1,
            price: '22.00'
        },
        breatheEasyTank: {
            url: '/breathe-easy-tank.html',
            name: 'Breathe-Easy Tank',
            size: 'S',
            color: 'Purple',
            quantity: 1,
            price: '34.00'
        }
    };

    before(() => {
        // Don't clear cookies and localStorage here
        // cy.clearCookies();
        // cy.clearLocalStorage();

        // Login
        cy.login();

        // After successful login, verify we're on the account page
        cy.url().should('include', '/customer/account');

        // Intercept necessary API calls
        //cy.intercept('GET', '**/customer/section/load/**').as('customerData');
        //cy.intercept('GET', '**/checkout/cart/totals/**').as('cartTotals');

        // Visit home page after login
        //cy.visit('/');

        // Wait for customer data to load
        //cy.wait('@customerData');

        // Now safely click the cart icon
        cy.get('.showcart')
            .should('be.visible')
            .and('not.have.class', 'loading')
            .click();

        // Wait for cart totals
        //cy.wait('@cartTotals');

        // // Verify empty cart or clear if items exist
        // cy.get('body').then(($body) => {
        //     if ($body.find('.cart.item').length > 0) {
        //         cy.clearCart();
        //     }
        // });
    });


    it('should add multiple products and verify total calculation', () => {
        // Add first product
        ProductPage.searchAndNavigateToProduct('Radiant Tee');
        ProductPage.selectProductOptions(products.radiantTee.size, products.radiantTee.color);
        ProductPage.setQuantity(products.radiantTee.quantity);
        ProductPage.addToCart();
    
        // // Wait for success message
        // cy.get('[data-ui-id="message-success"]')
        //     .should('be.visible')
            //.and('contain', 'You added Radiant Tee to your shopping cart.');
    
        // Add second product
        ProductPage.searchAndNavigateToProduct('Breathe-Easy Tank');
        ProductPage.selectProductOptions(products.breatheEasyTank.size, products.breatheEasyTank.color);
        ProductPage.setQuantity(products.breatheEasyTank.quantity);
        ProductPage.addToCart();
    
        // // Wait for success message
        // cy.get('[data-ui-id="message-success"]')
        //     .should('be.visible')
            //.and('contain', 'You added Breathe-Easy Tank to your shopping cart.');
    
        // Navigate to cart and verify
        ProductPage.navigateToCart();
        
        const itemsToVerify = [
            products.radiantTee,
            products.breatheEasyTank
        ];
        
        CartPage.verifyMultipleItems(itemsToVerify);
    });

    after(() => {
        //cy.clearCart();
        cy.logout();
        // Now it's safe to clear cookies and storage
        cy.clearCookies();
        cy.clearLocalStorage()
    });
});