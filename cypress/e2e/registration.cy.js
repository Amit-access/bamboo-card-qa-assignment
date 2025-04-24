import RegistrationPage from "../pages/RegistrationPage";

describe("User Registration and Login Test", () => {
  beforeEach(() => {
    cy.visit("/customer/account/create");
  });

  it("should successfully register a new user", () => {
    cy.fixture("users").then((userData) => {
      // Dynamically update the email with a timestamp
      const timestamp = Date.now();
      userData.newUser.email = `testuser${timestamp}@example.com`;

      RegistrationPage.fillRegistrationForm(userData.newUser);
      RegistrationPage.submitForm();

      // Verify successful registration
      cy.get(".message-success")
        .should("be.visible")
        .and("contain", "Thank you for registering");
    });
  });
  after(() => {
    cy.logout();
    // Now it's safe to clear cookies and storage
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
