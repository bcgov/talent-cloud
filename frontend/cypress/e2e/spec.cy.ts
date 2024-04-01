describe('local host spec', () => {
  // it('visits root directory (requires base url to be set)', () => {
  //   cy.visit('/');
  //   cy.get('Log In').click()
  // });

  it('visits localhost', () => {
    cy.intercept({ method: 'GET', url: 'http://localhost:3000/api/v1/keycloak' }).as(
      'apicheck',
    );
    // cy.visit('http://localhost:3000');
    cy.wait('@apicheck').then((interception) => {
      assert.isNotNull(interception.response.body, '1st API call has data');
    });
    // cy.get('button:contains("Log In")').filter(':visible').click();
  });

  // it('visits 127.0.0.1', () => {
  //   cy.visit('http://127.0.0.1:3000 ');
  //   cy.get('Log In').click()
  // });
});
