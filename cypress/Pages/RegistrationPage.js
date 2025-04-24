class RegistrationPage {
  elements = {
    firstNameInput: () => cy.get("#firstname"),
    lastNameInput: () => cy.get("#lastname"),
    emailInput: () => cy.get("#email_address"),
    passwordInput: () => cy.get("#password"),
    confirmPasswordInput: () => cy.get("#password-confirmation"),
    createAccountButton: () => cy.get('button[title="Create an Account"]'),
  };

  fillRegistrationForm(userData) {
    this.elements.firstNameInput().type(userData.firstName);
    this.elements.lastNameInput().type(userData.lastName);
    this.elements.emailInput().type(userData.email);
    this.elements.passwordInput().type(userData.password);
    this.elements.confirmPasswordInput().type(userData.password);
  }

  submitForm() {
    this.elements.createAccountButton().click();
  }
}

export default new RegistrationPage();
