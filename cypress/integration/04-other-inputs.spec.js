/// <reference types="cypress" />

/* eslint-disable no-undef */
describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
    cy.get('td[headers="whereToOrder-column"').as('whereToOrder-column');
    cy.get('#column-visibility').find("input[type='checkbox']").as('check-boxes');
    cy.get('th').as('table-headers');
  });

  // range input
  it.only('should set the range and verify it', () => {
    cy.get('@rating-filter').should('exist');
    cy.get('@rating-filter').invoke('val', '7').trigger('input');
    cy.get('@rating-filter').should('have.value', '7');
  });
  // select input
  it('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').select('KFC');
    cy.get('@restaurant-filter').should('have.value', 'KFC');
    cy.get('@whereToOrder-column').each((td) => {
      cy.get(td).should('contain.text', 'KFC');
    });
  });

  // checkbox input
  it('should check the checkbox and verify it', () => {
    cy.get('@table-headers').should('have.length', 8);
    cy.get('@check-boxes').check();
    cy.get('@check-boxes').should('be.checked');

    cy.get('@check-boxes').uncheck();
    cy.get('@check-boxes').should('not.be.checked');
  });
});
