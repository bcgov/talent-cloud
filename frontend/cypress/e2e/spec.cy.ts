describe('local host spec', () => {
  // it('visits root directory (requires base url to be set)', () => {
  //   cy.visit('/');
  //   cy.get('Log In').click()
  // });

  it('visits localhost', () => {
    cy.intercept(
      { method: 'GET', url: '/api/v1/keycloak' },
      {
        realm: 'local',
        client: 'local-clients',
        authUrl: 'http://localhost:8080',
      },
    ).as('apicheck');
    cy.visit('http://localhost:3000');
    cy.wait('@apicheck').then((interception) => {
      assert.isNotNull(interception.response.body, '1st API call has data');
      assert.equal(interception.response.body.client, 'local-clients');
    });
    // cy.get('button:contains("Log In")').filter(':visible').click();
  });

  // it('visits 127.0.0.1', () => {
  //   cy.visit('http://127.0.0.1:3000 ');
  //   cy.get('Log In').click()
  // });
});
