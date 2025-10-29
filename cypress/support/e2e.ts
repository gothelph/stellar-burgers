// cypress/support/e2e.js
import './commands';

// Базовая конфигурация
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
