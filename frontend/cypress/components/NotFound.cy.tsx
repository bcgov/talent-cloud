import NotFound from '../../src/pages/NotFound';

describe('<NotFound />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotFound />);
  });
});
