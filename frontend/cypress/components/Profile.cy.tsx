import React from 'react';
import Profile from '../../src/pages/Profile';

describe('<Profile />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Profile />);
  });
});
