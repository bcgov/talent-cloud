/// <reference types="Cypress" />

describe('Logistics Flow', () => {
  it('views the default page load for logistics', () => {
    cy.visit('/');
    cy.contains('Log In').should('be.visible');
    // cy.login_logistics();

    // cy.get('#region').click();
    // cy.get('input[value="SEA"]').click();

    // cy.intercept(
    //   'GET',
    //   '**/api/v1/personnel?page=1&rows=25&status=ACTIVE&region=SEA',
    // ).as('getLogsPersonnel');
    // cy.wait('@getLogsPersonnel').then((intercept) => {
    //   expect(
    //     intercept.response.body.personnel.every(
    //       (personnel) => personnel.status === 'ACTIVE',
    //     ),
    //   ).to.be.true;
    // });
    // cy.logout_logistics();
  });
});
