import Component from '../../src/routes/AppRoutes';

describe('<Component />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Component />);
  });
});
