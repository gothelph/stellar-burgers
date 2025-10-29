// cypress/support/commands.js
//  Можно оставить пустым или добавить только базовые утилиты

Cypress.Commands.add(
  'login',
  (email = 'test@example.com', password = 'password') => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
  }
);

Cypress.Commands.add('waitForIngredients', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.wait('@getIngredients');
});
