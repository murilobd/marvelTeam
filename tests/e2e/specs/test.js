// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    // cy.wait(10000);
    cy.server();
    cy.route('/v1/public/characters?*').as('getHeros');
    cy.visit('/');
    cy.wait('@getHeros');

    cy.contains('h1', 'Create your team by selecting 3 characters from the list of super-heroes.');
    cy.contains('p', '0/3 team members selected');
    cy.contains('Add to you team').click();
    cy.wait(1000);
    cy.contains('Add to you team').click();

    cy.wait(1000);
    cy.contains('Your team').click();

    cy.get('.ui.card').should('have.length', 2);

    cy.wait(1000);
    cy.contains('All Characters').click();

    cy.contains('Add to you team').click();
    cy.contains('.header', 'Congratulations');
    cy.wait(2000);
    cy.get('.actions button.ui.positive').click();
    cy.wait(1000);
    cy.contains('In your team').click();
    cy.wait(1000);
    cy.contains('Add to you team').click();
    cy.wait(1000);
    cy.contains('.header', 'Congratulations');
    cy.get('.actions button.ui.positive').click();
  });
});
