describe('local host spec', () => {
  // it('visits root directory (requires base url to be set)', () => {
  //   cy.visit('/');
  //   cy.get('Log In').click()
  // });

  it('visits localhost', () => {
    cy.visit('http://localhost:3000');
    cy.get('Log In').click();
  });

  // it('visits 127.0.0.1', () => {
  //   cy.visit('http://127.0.0.1:3000 ');
  //   cy.get('Log In').click()
  // });
});
