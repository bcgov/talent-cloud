describe('localhost spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In').click()
    
    cy.origin('http://localhost:8080', ()=> {
      cy.get('input[name="username"]').type('local-coordinator')
      cy.get('input[name="password"]').type('password')
      cy.contains('Sign In').click()
    })
    cy.contains('Personnel')
  });
  
});
