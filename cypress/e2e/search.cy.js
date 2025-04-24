// cypress/e2e/search.cy.js
import SearchPage from '../pages/SearchPage';

describe('Search Functionality', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should search for products and validate results', () => {
        const searchTerm = 'yoga';
        
        SearchPage.performSearch(searchTerm);
        
        // Verify search results
        SearchPage.elements.searchResults()
            .should('have.length.gt', 0)
            .each(($product) => {
                const productName = $product.find('.product-item-link').text().toLowerCase();
                expect(productName).to.include(searchTerm);
            });

        // Verify filter functionality
        SearchPage.applyPriceFilter('0-50');
        SearchPage.elements.productPrices().each(($price) => {
            const price = parseFloat($price.text().replace('$', ''));
            expect(price).to.be.lte(50);
        });
    });
});