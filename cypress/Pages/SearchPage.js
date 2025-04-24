// cypress/pages/SearchPage.js
class SearchPage {
    elements = {
        searchBox: () => cy.get('#search'),
        searchButton: () => cy.get('button[title="Search"]'),
        searchResults: () => cy.get('.product-item'),
        productPrices: () => cy.get('.product-item-info .price'),
        priceFilter: () => cy.get('.price-filter'),
        sortDropdown: () => cy.get('[data-role="sorter"]')
    }

    performSearch(searchTerm) {
        this.elements.searchBox().clear().type(searchTerm);
        this.elements.searchButton().click();
    }

    applyPriceFilter(range) {
        this.elements.priceFilter().contains(range).click();
        // Wait for results to update
        cy.wait(2000);
    }

    sortResults(sortOption) {
        this.elements.sortDropdown().select(sortOption);
        // Wait for results to update
        cy.wait(2000);
    }
}

export default new SearchPage();