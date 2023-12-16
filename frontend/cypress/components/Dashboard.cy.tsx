import React from 'react';
import Dashboard from '../../src/pages/Dashboard';

describe('<Dashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />);
  });
});
