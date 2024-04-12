/// <reference types="Cypress" />
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Ensure global app styles are loaded:
// import '../../src/index.css';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
Cypress.Commands.add('login_coordinator', () => {
  console.log(Cypress.env('CYPRESS_KEYCLOAK_USER'));
  cy.visit('/');
  cy.wait(1000);
  cy.intercept({ method: 'GET', url: '**/api/v1/keycloak' }).as('keycloak');

  cy.get('#login-button-main').click();

  cy.origin('https://logontest7.gov.bc.ca/', () => {
    cy.get('#user').type(Cypress.env('CYPRESS_KEYCLOAK_USER'));
    cy.get('#password').type(Cypress.env('CYPRESS_KEYCLOAK_PASSWORD'));
    cy.contains('Continue').click();
  });
});

Cypress.Commands.add('logout_coordinator', () => {
  cy.contains('Chelsea Brown').click();
  cy.contains('Logout').click();
});
