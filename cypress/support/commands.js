// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
// cypress/support/commands.js

Cypress.Commands.add('login', () => {
    // Visit the login page
    cy.visit('/customer/account/login');

    // Get login credentials from fixtures
    cy.fixture('users').then((userData) => {
        // Type email and password
        cy.get('#email')
            .should('be.visible')
            .type(userData.existingUser.email);

        cy.get('#pass')
            .should('be.visible')
            .type(userData.existingUser.password);

        // // Intercept the login request
        // cy.intercept('POST', '**/customer/ajax/login').as('loginRequest');
        // cy.intercept('GET', '**/customer/section/load/**').as('customerData');

        // Click login button
        cy.get('#send2').click();

        // // Wait for login request and customer data
        // cy.wait('@loginRequest');
        // cy.wait('@customerData');

        // Verify successful login
        cy.url().should('include', '/customer/account');
    });
});

// cypress/support/commands.js

Cypress.Commands.add('clearCart', () => {
    // Visit cart page
    cy.visit('/checkout/cart');
    
    // Check if there are items in the cart and remove them
    cy.get('body').then(($body) => {
        // Check if cart has items
        if ($body.find('.cart.item').length > 0) {
            // Click on each delete button
            cy.get('.action-delete').each(($deleteButton) => {
                cy.wrap($deleteButton).click({force:true});
                // Wait for item to be removed
                cy.wait(1000);
            });
            
            // Verify cart is empty
            cy.get('.cart-empty')
                .should('be.visible')
                .and('contain', 'You have no items in your shopping cart');
        }
    });

    // Additional verification and cleanup steps
    cy.then(() => {
        // Clear local storage
        cy.clearLocalStorage();
        // Clear session storage
        cy.clearCookies();
        
        // Reload page to ensure clean state
        //cy.reload();
        
        // Final verification that cart is empty
        cy.get('body').then(($body) => {
            if ($body.find('.cart.item').length > 0) {
                throw new Error('Cart was not properly cleared');
            }
        });
    });
});

// cypress/support/commands.js

Cypress.Commands.add('logout', () => {
    // Click on customer menu
    cy.get('.customer-welcome .customer-name').eq(0).click({force:true});
    cy.wait(1000);
    
    // Click logout
    cy.get('a').contains('Sign Out').scrollIntoView().click({force:true});
    
    // // Verify logout
    // cy.url().should('include', '/logoutSuccess');
    // OR verify login link
    cy.get('.authorization-link')
        .should('be.visible')
        .and('contain', 'Sign In');
        
    // Clear cookies and storage
    cy.clearCookies();
    cy.clearLocalStorage();
});