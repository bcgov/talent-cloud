/// <reference types="Cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login_coordinator', () => {
  cy.visit('/');
  cy.get('#login-button-main').contains('Log In').click();
  cy.wait(2000);

  cy.origin('https://logontest7.gov.bc.ca', () => {
    cy.get('#user').type(Cypress.env('KEYCLOAK_USER'));
    cy.get('#password').type(Cypress.env('KEYCLOAK_PASSWORD'));
    cy.contains('Continue').click();
  });

  cy.wait(2000);
  cy.visit('/dashboard');
  cy.get('h1').contains('Personnel');
  cy.get('p').contains('Chelsea Brown');
});

Cypress.Commands.add('logout_coordinator', () => {
  cy.visit('/dashboard');
  cy.contains('Chelsea Brown').click();
  cy.contains('Logout').click();
});
