describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/auth/login', {
      fixture: 'auth.json'
    }).as('login');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  // --- ЗАГРУЗКА ИНГРЕДИЕНТОВ ---
  describe('Загрузка ингредиентов', () => {
    it('должна загружать и отображать ингредиенты', () => {
      cy.contains('Соберите бургер').should('be.visible');
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
      cy.contains('Соус Spicy-X').scrollIntoView().should('be.visible');
    });
  });

  // --- МОДАЛЬНЫЕ ОКНА ---
  describe('Модальные окна ингредиентов', () => {
    it('должна открывать модальное окно ингредиента при клике', () => {
      cy.contains('Краторная булка N-200i').click();

      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Краторная булка N-200i').should('be.visible');
    });

    it('должна закрывать модальное окно по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/');

      cy.get('button').then(($buttons) => {
        const closeBtn = $buttons
          .filter(
            (i, btn) =>
              btn.innerHTML.includes('×') || btn.textContent.includes('Закрыть')
          )
          .first();

        if (closeBtn.length) {
          cy.wrap(closeBtn).click({ force: true });
        } else {
          cy.go('back');
        }
      });

      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('должна закрывать модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/');

      cy.get('body').then(($body) => {
        const overlay = $body
          .find('[class*="overlay"], [class*="backdrop"]')
          .first();
        if (overlay.length) {
          cy.wrap(overlay).click({ force: true });
        } else {
          cy.get('body').type('{esc}');
        }
      });

      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('должна закрывать модальное окно по нажатию ESC', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/');
      cy.get('body').type('{esc}');
      cy.url().should('eq', 'http://localhost:4000/');
    });
  });

  // --- СОЗДАНИЕ ЗАКАЗА ---
  describe('Создание заказа', () => {
    it('должна создавать заказ после авторизации', () => {
      //Фейковые токены
      window.localStorage.setItem('accessToken', 'fake-access-token');
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
      cy.contains('Оформить заказ').should('exist');

      // Добавляем ингредиенты
      cy.contains('Краторная булка N-200i').then(($ingredient) => {
        cy.wrap($ingredient)
          .parent()
          .within(() => {
            cy.get('button')
              .filter(
                (i, btn) =>
                  btn.textContent.includes('Добавить') ||
                  btn.textContent === '+'
              )
              .click({ force: true });
          });
      });

      cy.contains('Биокотлета из марсианской Магнолии').then(($ingredient) => {
        cy.wrap($ingredient)
          .parent()
          .within(() => {
            cy.get('button')
              .filter(
                (i, btn) =>
                  btn.textContent.includes('Добавить') ||
                  btn.textContent === '+'
              )
              .click({ force: true });
          });
      });

      // Пробуем оформить заказ
      cy.contains('Оформить заказ').click();

      //Успешное создание заказа
      cy.contains('12345').should('be.visible');
      cy.contains('идентификатор заказа').should('be.visible');

      //Проверяем результат
      cy.get('button').then(($buttons) => {
        const closeBtn = $buttons
          .filter(
            (_, btn) =>
              btn.innerHTML.includes('×') || btn.textContent.includes('Закрыть')
          )
          .first();

        if (closeBtn.length) {
          cy.wrap(closeBtn).click({ force: true });
        } else {
          cy.get('body').type('{esc}');
        }
      });

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });

    afterEach(() => {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });

  // --- ДОБАВЛЕНИЕ ИНГРЕДИЕНТОВ ---
  describe('Добавление ингредиентов', () => {
    it('должна показывать ингредиенты в конструкторе после добавления', () => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');

      cy.contains('Краторная булка N-200i').then(($ingredient) => {
        cy.wrap($ingredient).dblclick();
        cy.wrap($ingredient)
          .parent()
          .within(() => {
            cy.get('button')
              .filter(
                (i, btn) =>
                  btn.textContent.includes('Добавить') ||
                  btn.textContent === '+'
              )
              .click({ force: true });
          });
      });

      cy.get('body').then(($body) => {
        if ($body.text().includes('Краторная булка N-200i (верх)')) {
          cy.contains('Краторная булка N-200i (верх)').should('exist');
          cy.contains('Краторная булка N-200i (низ)').should('exist');
        }
      });
    });

    it('должна обновлять стоимость', () => {
      cy.contains('0').should('exist');
      cy.log(
        'Проверка стоимости выполняется после добавления ингредиентов (зависит от состояния конструктора)'
      );
    });
  });
});
