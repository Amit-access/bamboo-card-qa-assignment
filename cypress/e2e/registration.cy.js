import RegistrationPage from "../pages/RegistrationPage";

describe("User Registration and Login Test", () => {
  beforeEach(() => {
    cy.visit("/customer/account/create");
  });

  it("should successfully register a new user", () => {
    cy.fixture("users").then((userData) => {
      // Dynamically update the email with timestamp
      const timestamp = Date.now();
      const dynamicEmail = `testuser${timestamp}@example.com`;

      const user = {
        ...userData.newUser,
        email: dynamicEmail,
        password: Cypress.env("NEW_USER_PASSWORD"),
        confirmPassword: Cypress.env("NEW_USER_PASSWORD")
      };

      RegistrationPage.fillRegistrationForm(user);
      RegistrationPage.submitForm();

      // Verify successful registration
      cy.get(".message-success")
        .should("be.visible")
        .and("contain", "Thank you for registering");
    });
  });

  after(() => {
    cy.logout();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});