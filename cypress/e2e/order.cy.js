import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";

describe("Place Order with Multiple Products", () => {
  let products;

  before(() => {
    // Load products from fixture
    cy.fixture("products").then((data) => {
      products = data.products;
    });

    // Login using environment credentials
    cy.loginWithEnvCredentials();

    // After successful login, verify we're on the account page
    cy.url().should("include", "/customer/account");
  });

  it("should add multiple products and verify total calculation", () => {
    // Add products to cart
    products.forEach((product) => {
      ProductPage.searchAndNavigateToProduct(product.name);
      ProductPage.selectProductOptions(product.size, product.color);
      ProductPage.setQuantity(product.quantity);
      ProductPage.addToCart();
    });

    // Navigate to cart and verify
    ProductPage.navigateToCart({ duration: 5000 });

    CartPage.verifyMultipleItems(products);
  });

  after(() => {
    cy.clearCart();
    cy.logout();
    // Now it's safe to clear cookies and storage
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
