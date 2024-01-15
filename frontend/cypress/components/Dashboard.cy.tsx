import Dashboard from '../../src/pages/dashboard/Dashboard';

describe('<Dashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />);
  });
});
