import RegistrationPage from '../pages/RegistrationPage';

describe('User Registration and Login Test', () => {
    beforeEach(() => {
        cy.visit('/customer/account/create');
    });

    it('should successfully register a new user', () => {
        cy.fixture('users').then((userData) => {
            RegistrationPage.fillRegistrationForm(userData.newUser);
            RegistrationPage.submitForm();
            
            // Verify successful registration
            cy.get('.message-success')
                .should('be.visible')
                .and('contain', 'Thank you for registering');
        });
    });
});