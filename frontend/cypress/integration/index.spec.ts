import { APP_URL } from '../../src/common/constants';

describe('Initial Page Load', () => {
  it('passes', () => {
    cy.visit(APP_URL);
  });
});
