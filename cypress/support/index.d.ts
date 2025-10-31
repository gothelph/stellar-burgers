// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Выполняет авторизацию пользователя
     * @example cy.login('test@example.com', 'password')
     */
    login(email?: string, password?: string): Chainable<void>;

    /**
     * Ожидает загрузку ингредиентов
     * @example cy.waitForIngredients()
     */
    waitForIngredients(): Chainable<void>;
  }
}
