// cypress/e2e/wishlist.cy.js
import ProductPage from '../Pages/ProductPage';
import WishlistPage from '../pages/WishlistPage';
import CartPage from '../Pages/CartPage';

describe('Wishlist Functionality', () => {
    const products = {
        fusionBackpack: {
            name: 'Fusion Backpack',
            size: '',  // if needed
            color: '',  // if needed
        },
        // pushItBag: {
        //     name: 'Push It Messenger Bag',
        //     size: '',  // if needed
        //     color: '',  // if needed
        // }
    };

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();

        // Clear wishlist if items exist
        // cy.visit('/wishlist/');
        // cy.get('body').then(($body) => {
        //     if ($body.find('.products-grid.wishlist').length > 0) {
        //         WishlistPage.clearWishlist();
        //     }
        // });
    });

    it('should add products to wishlist and checkout', () => {
        // Search and add first product to wishlist
        cy.get('#search')
            .should('be.visible')
            .clear()
            .type('Fusion Backpack{enter}');

        cy.get('.product-item-link')
            .contains('Fusion Backpack')
            .should('be.visible')
            .click();

        // Wait for product page to load and add to wishlist
        cy.url().should('include', '.html');
        ProductPage.addToWishlist();

        // Verify success message
        cy.get('[data-ui-id="message-success"]')
            .should('be.visible')
            //.and('contain', 'has been added to your Wish List');

        // // Search and add second product to wishlist
        // cy.get('#search')
        //     .should('be.visible')
        //     .clear()
        //     .type('Push It Messenger Bag{enter}');

        // cy.get('.product-item-link')
        //     .contains('Push It Messenger Bag')
        //     .should('be.visible')
        //     .click();

        // // Wait for product page to load and add to wishlist
        // cy.url().should('include', '.html');
        // ProductPage.addToWishlist();

        // // Verify success message
        // cy.get('[data-ui-id="message-success"]')
        //     .should('be.visible')
        //     .and('contain', 'has been added to your Wish List');

        // Visit wishlist and verify products
        // cy.addToWishlist();
        WishlistPage.elements.wishlistItems()
            .should('have.length', 1);

        // Verify specific products in wishlist
        WishlistPage.verifyWishlistItem(products.fusionBackpack.name);
        // WishlistPage.verifyWishlistItem(products.pushItBag.name);

        // Add all items to cart from wishlist
        WishlistPage.addAllToCart();

        // Verify success message
        cy.get('[data-ui-id="message-success"]')
            .should('be.visible')
            //.and('contain', 'have been added to your shopping cart');

        // Navigate to cart and proceed to checkout
        cy.get('.showcart').click();
        cy.get('.viewcart').click();

        // Verify items in cart before checkout
        CartPage.elements.cartItems()
            .should('have.length', 1);

        // Proceed to checkout
        CartPage.elements.checkoutButton().click();
    });

    after(() => {
        // // Clear wishlist
        // cy.visit('/wishlist/');
        // WishlistPage.clearWishlist();
        
        // // Clear cart
        // cy.clearCart();
        
        // Logout
        cy.logout();
    });
});