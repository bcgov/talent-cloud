describe('template spec', () => {
  it('logs in', async () => {
    cy.viewport(1440, 1000);

    cy.visit('http://localhost:3000/');

    cy.intercept({ method: 'GET', url: '**/api/v1/keycloak' }).as('keycloak');

    cy.wait('@keycloak').then((res) => {
      cy.log(res.response.body);
      cy.get('#login-button-main').contains('Log In').click();
      cy.origin('http://localhost:8080', () => {
        cy.get('#username').type('local-coordinator');
        cy.get('#password').type('password');
        cy.get('#kc-login').click();
      });
    });
  });
});
