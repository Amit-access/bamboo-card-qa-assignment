import ProductPage from "../Pages/ProductPage";
import WishlistPage from "../Pages/WishlistPage";
import CartPage from "../Pages/CartPage";

describe("Wishlist Functionality", () => {
  let wishlistProducts;

  before(() => {
    cy.fixture("wishlistProducts").then((data) => {
      wishlistProducts = data.products;
    });

    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login();
  });

  it("should add products in Wishlist and checkout", () => {
    wishlistProducts.forEach((product) => {
      cy.get("#search").clear().type(`${product.name}{enter}`);

      cy.get(".product-item-link").contains(product.name).click();

      cy.url().should("include", ".html");
      ProductPage.selectProductOptions(product.size, product.color);
      ProductPage.addToWishlist();

      cy.get('[data-ui-id="message-success"]').should("be.visible");
    });

    WishlistPage.elements
      .wishlistItems()
      .should("have.length", wishlistProducts.length);

    WishlistPage.addAllToCart();
    ProductPage.navigateToCart();
    CartPage.elements.checkoutButton().should("be.visible");
  });

  after(() => {
    cy.clearCart();
    cy.logout();
  });
});
