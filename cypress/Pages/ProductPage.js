// cypress/pages/ProductPage.js
class ProductPage {
  elements = {
    // Existing elements
    cartIcon: () => cy.get(".showcart"),
    miniCartDropdown: () => cy.get("#ui-id-1"),
    viewCartLink: () => cy.get(".viewcart"),
    successMessage: () => cy.get('[data-ui-id="message-success"]'),

    // New elements for navigation
    searchBox: () => cy.get("#search"),
    searchResults: () => cy.get(".product-item-link"),
    addToCartButton: () => cy.get("#product-addtocart-button"),
    sizeOptions: () => cy.get(".swatch-option.text"),
    colorOptions: () => cy.get(".swatch-option.color"),
    quantityInput: () => cy.get("#qty"),

    addToWishlistButton: () =>
      cy.get('.product-addto-links>[data-action="add-to-wishlist"]'),
    //successMessage: () => cy.get('[data-ui-id="message-success"]'),
    searchBox: () => cy.get("#search"),
    searchResults: () => cy.get(".product-item-link"),

    wishlistHeartIcon: () => cy.get(".towishlist"),
    productItem: () => cy.get(".product-item"),
  };

  searchAndNavigateToProduct(productName) {
    this.elements.searchBox().clear().type(`${productName}{enter}`);

    this.elements.searchResults().contains(productName).click();

    // Wait for product page to load
    cy.url().should("include", ".html");
  }

  selectProductOptions(size, color) {
    this.elements.sizeOptions().contains(size).click();

    this.elements.colorOptions().filter(`[option-label="${color}"]`).click();
  }

  setQuantity(quantity) {
    this.elements.quantityInput().clear().type(quantity);
  }

  addToCart() {
    this.elements.addToCartButton().click();

    // // Wait for success message
    // this.elements.successMessage()
    //     .should('be.visible')
    //.and('contain', 'added to your shopping cart');
  }

  clickCartIcon() {
    cy.wait(2000); // Wait for any animations
    this.elements.cartIcon().scrollIntoView().click();
    cy.wait(1000); // Wait for mini cart to load
  }

  navigateToCart() {
    this.clickCartIcon();
    this.elements.viewCartLink().should("be.visible").click();
  }

  addToWishlist() {
    this.elements
      .addToWishlistButton()
      .should("be.visible")
      .click({ force: true });

    // Wait for success message
    this.elements
      .successMessage()
      .should("be.visible")
      .and("contain", "has been added to your Wish List");
  }

  searchAndNavigateToProduct(productName) {
    this.elements
      .searchBox()
      .should("be.visible")
      .clear()
      .type(`${productName}{enter}`);

    this.elements
      .searchResults()
      .contains(productName)
      .should("be.visible")
      .click();

    // Wait for product page to load
    cy.url().should("include", ".html");
  }

  addToWishlistViaHeart() {
    this.elements.productItem().trigger("mouseover").eq(0);

    this.elements.wishlistHeartIcon().should("be.visible").click();

    // Wait for success message
    cy.get('[data-ui-id="message-success"]').should("be.visible");
  }
}

export default new ProductPage();
