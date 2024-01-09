import React from 'react';
import { Loading } from '../../src/components/ui/Loading';

describe('<Loading />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loading />);
  });
});
