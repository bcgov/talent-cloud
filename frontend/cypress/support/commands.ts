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
  cy.intercept({ method: 'GET', url: '**/api/v1/keycloak' }).as('keycloak');

  cy.wait('@keycloak').then((res) => {
    cy.log(res.response.body);
    cy.get('#login-button-main').contains('Log In').click();
    cy.origin('http://localhost:8080', () => {
      cy.get('#username').type('local-coordinator');
      cy.get('#password').type('password');
      cy.get('#kc-login').click();
    });

    cy.get('h1').contains('Personnel');
    cy.get('p').contains('Local Coordinator');
  });
});

Cypress.Commands.add('login_logistics', () => {
  cy.visit('/');

  cy.intercept({ method: 'GET', url: '**/api/v1/keycloak' }).as('keycloak');

  cy.wait('@keycloak').then((res) => {
    cy.get('#login-button-main').contains('Log In').click();
    cy.origin('http://localhost:8080', () => {
      cy.get('#username').type('local-logistics');
      cy.get('#password').type('password');
      cy.get('#kc-login').click();
    });
    cy.get('h1').contains('Personnel');
    cy.get('p').contains('Logistics Officer');
  });
});

Cypress.Commands.add('logout_coordinator', () => {
  cy.visit('/dashboard');
  cy.contains('Local Coordinator').click();
  cy.contains('Logout').click();
});

Cypress.Commands.add('logout_logistics', () => {
  cy.visit('/dashboard');
  cy.contains('Logistics Officer').click();
  cy.contains('Logout').click();
});
