import React from 'react';
import Component from '../../src/routes/Routes';

describe('<Component />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Component />);
  });
});
