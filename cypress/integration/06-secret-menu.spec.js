/// <reference types="cypress" />

/* eslint-disable no-undef */
const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  properties.forEach((propName) => {
    it(`should have a column for ${propName}`, () => {
      // all checkboxes input are exist
      cy.get(`input#show-${propName}`);

      // all table columns are exist
      cy.get(`#${propName}-column`);
    });
    it(`should hide ${propName} column if unchecked`, () => {
      // check column is hidden when item is checkd
      cy.get(`input#show-${propName}`).uncheck();
      cy.get(`#${propName}-column`).should('to.be.hidden');
    });
  });

  // check all restaurants in SELECT elemnt
  restaurants.forEach((restName) => {
    it(`should have "${restName}" in the Select menue`, () => {
      cy.get('#restaurant-visibility-filter').as('select-resturant');
      cy.get('@select-resturant').select(restName).trigger('change');
      cy.get('@select-resturant').should('have.value', restName);
    });
    it.only(`should display rows that match "${restName}" when selected`, () => {
      cy.get('#restaurant-visibility-filter').as('select-resturant');
      cy.get('@select-resturant').select(restName);
      cy.get('.whereToOrder').each((cell) =>
        cy.get(cell).contains(restName).and('have.length.at.least', 1),
      );
      // cy.get('.whereToOrder').each(($cell) => cy.wrap($cell).contains(restName));
    });
  });

  // check all RANGE values
  ratings.forEach((rangeValue) => {
    it(`should allow ${rangeValue} to be selected in Range`, () => {
      cy.get('#minimum-rating-visibility').as('rating-filter');
      cy.get('@rating-filter').invoke('val', rangeValue).trigger('change');

      cy.get('td.popularity').each(($val) => {
        expect(+$val.text()).to.be.gte(rangeValue);
      });
    });
  });
});
