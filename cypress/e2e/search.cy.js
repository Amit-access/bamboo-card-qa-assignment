import SearchPage from "../pages/SearchPage";

describe("Search Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should search for products and validate results", () => {
    const searchTerm = "bag"; // Convert search term to lowercase

    SearchPage.performSearch(searchTerm);

    // Verify search results
    SearchPage.elements
      .searchResults()
      .should("have.length.gt", 0)
      .then(($results) => {
        // Limit to the first 3 items
        const limitedResults = $results.slice(0, 3);

        // Iterate through the limited results
        cy.wrap(limitedResults).each(($product) => {
          const productName = $product
            .find(".product-item-link")
            .text()
            .toLowerCase()
            .trim(); // Convert product name to lowercase
          expect(productName).to.include(searchTerm); // Perform case-insensitive comparison
        });
      });

    // // Verify filter functionality
    // SearchPage.applyPriceFilter('0-50');
    // SearchPage.elements.productPrices().each(($price) => {
    //     const price = parseFloat($price.text().replace('$', '').trim()); // Trim whitespace
    //     expect(price).to.be.lte(50);
    // });
  });
});
