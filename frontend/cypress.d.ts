import type { mount } from 'cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      login_coordinator(): Chainable<void>;
      // login_logistics(): Chainable<void>;
      logout_coordinator(): Chainable<void>;
      // logout_logistics(): Chainable<void>;
    }
  }
}
