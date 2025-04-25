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

Cypress.Commands.add('loginWithEnvCredentials', () => {
    // Visit the login page
    cy.visit('/customer/account/login');
  
    // Read credentials from Cypress environment variables
    const username = Cypress.env('BAMBOO_USERNAME');
    const password = Cypress.env('BAMBOO_PASSWORD');
  cy.wait(1000)
    // Type credentials
    cy.get('#email')
      .should('be.visible')
      .type(username);
  
    cy.get('#pass')
      .should('be.visible')
      .type(password);
  
    // Submit login form
    cy.get('#send2').click();
  
    // Confirm successful login
    cy.url().should('include', '/customer/account');
  });

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

Cypress.Commands.add('clearCart', () => {
    function removeItemsIfExist() {
      cy.get('body').then(($body) => {
        if ($body.find('.action.action-delete').length > 0) {
          cy.get('.action.action-delete').first().click({force:true});
  
          // Wait for item to be removed (adjust selector if needed)
          cy.wait(1000);
  
          // Recurse to handle next item
          removeItemsIfExist();
        } else {
          cy.log('Cart is now empty');
        }
      });
    }
  
    removeItemsIfExist();
  });