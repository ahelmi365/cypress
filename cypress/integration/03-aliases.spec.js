/// <reference types="cypress" />

/*eslint-disable no-undef */

/*
Make an alias for the filter input.
Type a search term into that filter.
Verify that only items match that filter are shown on the page.
 */
describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"] ').as('allItems');
    cy.get('[data-test="items-unpacked"] ').as('unpackedItems');
    cy.get('[data-test="items-packed"] ').as('packedItems');
  });

  it('should filter items', () => {
    cy.get('@filterInput').type('tooth');
    cy.get('@allItems').should('not.contain.text', 'hodie');
    cy.get('@allItems').should('contain.text', 'Tooth');
  });
  it('should find filtered item in unpacked list', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItemLable');
    cy.get('@firstItemLable')
      .invoke('text')
      .then((text) => {
        cy.get('@firstItemLable').click();
        cy.get('@packedItems').contains(text);
      });
  });
});
