/// <reference types="cypress" />

/* eslint-disable no-undef */
describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('include', '/sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]').click();
    cy.location('pathname').should('include', '/sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').as('email-input');
    cy.get('[data-test="sign-up-password"]').as('password-input');
    cy.get('[data-test="sign-up-submit"]').as('submitBtn');
  });

  it('should require an email', () => {
    cy.get('@submitBtn').click();
    cy.get('@email-input')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field.');

    // cy.get('@email-input').invoke('prop', 'validity').its('valid').should('be.false');
    // cy.get('@email-input').invoke('prop', 'validity').its('valueMissing').should('be.true');
    // alternative solution
    cy.get('@email-input')
      .invoke('prop', 'validity')
      .then((validity) => {
        expect(validity.valid).to.be.false;
        expect(validity.valueMissing).to.be.true;
      });
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email-input')
      .type('ahelmi@getgrou.com')
      .should('have.value', 'ahelmi@getgrou.com')
      .invoke('prop', 'validity')
      .its('valid')
      .should('be.true');

    // cy.get('@email-input').invoke('prop', 'validity').its('valid').should('be.true');
    // cy.get('@email-input').invoke('prop', 'validity').its('valueMissing').should('be.false');

    cy.get('@email-input')
      .invoke('prop', 'validity')
      .then((validity) => {
        expect(validity.valueMissing).to.be.false;
        expect(validity.valid).to.be.true;
      });

    // check email is an email address
    // contains @
    // length > 3 and < 100
    cy.get('@email-input')
      .invoke('val')
      .should('contain', '@')
      .and('have.length.above', 3)
      .and('have.length.below', 100);
  });

  it.only('should require a password when the email is present', () => {
    // cy.get('@email-input').type('ahelmi@getgrou.com{enter}');
    cy.get('@email-input').type('ahelmi@getgrou.com').should('have.value', 'ahelmi@getgrou.com');
    cy.get('@submitBtn').click();
    cy.get('@password-input')
      .invoke('prop', 'validity')
      .then((validity) => {
        expect(validity.valid).to.be.false;
        expect(validity.valueMissing).to.be.true;
      });
  });
});
