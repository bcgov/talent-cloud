import AppHealth from '../../src/pages/AppHealth';

describe('<AppHealth />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppHealth />);
  });
});
