/// <reference types="cypress" />

describe('Coordinator Flow', () => {
  /**
   * Logs in as coordinator and views the default page load, which should contain three tabs: Active, Inactive, and Pending.
   */
  it('views the default page load', () => {
    cy.visit('/home');
    cy.wait(1000);
    cy.intercept({ method: 'GET', url: '**/api/v1/keycloak' }).as('keycloak');

    cy.contains('Welcome to CORE Team').should('exist');
  });
  // /**
  //  * Logs in as coordinator and views the inactive tab, which should contain three personnel.
  //  * Verifies that the count of the other tabs is also three
  //  */
  // it('views the inactive tab', () => {
  //   cy.login_coordinator();

  //   cy.contains('Inactive').click();
  //   cy.contains('POUROS, Hayden').should('exist');
  //   cy.contains('QUIZTON, Roberto').should('exist');
  //   cy.contains('PAUCEK, Esta').should('exist');

  //   cy.logout_coordinator();
  // });

  // it('filters the response by region and location', () => {
  //   cy.login_coordinator();

  //   cy.get('#region').click();
  //   cy.get('input[value="SEA"]').click();

  //   cy.get('#location').click();
  //   cy.get('input[value="Kimberley"]').click();

  //   cy.intercept(
  //     'GET',
  //     '**/api/v1/personnel?page=1&rows=25&status=ACTIVE&region=SEA&location=Kimberley',
  //   ).as('getPersonnelSEA');
  //   cy.wait('@getPersonnelSEA').then((intercept) => {
  //     intercept.response.body.personnel.map((person) => {
  //       expect(person.homeLocation.region).to.equal('SEA');
  //       expect(person.homeLocation.locationName).to.equal('Kimberley');
  //       expect(intercept.response.body.count.ACTIVE).to.equal(1);
  //       expect(intercept.response.body.count.INACTIVE).to.equal(0);
  //       expect(intercept.response.body.count.PENDING).to.equal(0);
  //     });
  //   });
  //   cy.logout_coordinator();
  // });
  // // /**
  // //  * Logs in as coordinator and searches by name.
  // //  * There should be two active personnel and one pending returned.
  // //  */
  // it('filters the response by name', () => {
  //   cy.login_coordinator();

  //   cy.get('input[name="name"]').type('BART');

  //   cy.intercept(
  //     'GET',
  //     '**/api/v1/personnel?page=1&rows=25&status=ACTIVE&name=BART',
  //   ).as('getPersonnelBART');
  //   cy.wait('@getPersonnelBART').then((intercept) => {
  //     expect(intercept.response.body.personnel).to.have.length(2);
  //     expect(intercept.response.body.count.ACTIVE).to.equal(2);
  //     expect(intercept.response.body.count.INACTIVE).to.equal(0);
  //     expect(intercept.response.body.count.PENDING).to.equal(1);
  //   });

  //   cy.logout_coordinator();
  // });

  // it('filters the response by availability', () => {
  //   cy.login_coordinator();

  //   cy.get('#availabilityType').click();
  //   cy.contains('Available').click();

  //   cy.intercept(
  //     'GET',
  //     '**/api/v1/personnel?page=1&rows=25&status=ACTIVE&availabilityType=AVAILABLE',
  //   ).as('getAvailable');
  //   cy.wait('@getAvailable').then((intercept) => {
  //     expect(intercept.response.body.personnel).to.have.length(0);
  //     expect(intercept.response.body.count.ACTIVE).to.equal(0);
  //     expect(intercept.response.body.count.INACTIVE).to.equal(0);
  //     expect(intercept.response.body.count.PENDING).to.equal(0);
  //   });

  //   cy.logout_coordinator();
  // });

  // it('it finds and approves a pending applicant', () => {
  //   cy.login_coordinator();

  //   cy.get('button').contains('Pending').click();
  //   cy.get('#region').click();
  //   cy.get('input[value="NEA"]').click();

  //   cy.intercept(
  //     'GET',
  //     '**/api/v1/personnel?page=1&rows=25&status=PENDING&region=NEA',
  //   ).as('getPendingPersonnelNEA');

  //   cy.wait('@getPendingPersonnelNEA').then((intercept) => {
  //     expect(intercept.response.body.personnel).to.have.length(1);
  //     expect(intercept.response.body.count.ACTIVE).to.equal(0);
  //     expect(intercept.response.body.count.PENDING).to.equal(1);
  //     expect(intercept.response.body.count.INACTIVE).to.equal(1);
  //   });
  //   cy.logout_coordinator();
  // });

  // it('contains the filters specific to emcr', () => {
  //   cy.login_coordinator();

  //   cy.contains('Search By Name').should('exist');
  //   cy.contains('Region').should('exist');
  //   cy.contains('Home Location').should('exist');
  //   cy.contains('Availability').should('exist');
  //   cy.contains('Function & Experience Level').should('exist');
  //   cy.contains('Availability').should('exist');
  //   cy.contains('Availability Date Range').should('exist');
  //   cy.logout_coordinator();
  // })
});
