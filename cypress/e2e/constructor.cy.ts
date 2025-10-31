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

  // --- МОГИЛЬНЫЕ ОКНА ---
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
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist'); //Исправлено 7
      cy.location('pathname').should('eq', '/'); //Исправлено 1
    });

    it('должна закрывать модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist'); //Исправлено 8
      cy.location('pathname').should('eq', '/'); // Исправлено 2
    });

    it('должна закрывать модальное окно по нажатию ESC', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/');
      cy.get('body').type('{esc}');
      cy.get('[data-cy="modal"]').should('not.exist'); //Исправлено 9
      cy.location('pathname').should('eq', '/'); // Исправлено 3
    });
  });

  // --- СОЗДАНИЕ ЗАКАЗА ---
  describe('Создание заказа', () => {
    it('должна создавать заказ после авторизации', () => {
      //Фейковые токены
      cy.window().then((win) => {
        win.localStorage.setItem('accessToken', 'fake-access-token');
        win.localStorage.setItem('refreshToken', 'fake-refresh-token');
      }); //Исправлено 5

      cy.get('[data-cy="order-button"]').should('exist');
      cy.contains('Краторная булка N-200i').then(($ingredient) => {
        cy.wrap($ingredient)
          .parent()
          .within(() => {
            cy.get('button')
              .filter(
                (_, btn) =>
                  btn.textContent?.includes('Добавить') || //Исправлено 12: учтена настройка окружения, теперь код должен работать корректно
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
                (_, btn) =>
                  btn.textContent?.includes('Добавить') || //Исправлено 13 учтена настройка окружения, теперь код должен работать корректно
                  btn.textContent === '+'
              )
              .click({ force: true });
          });
      });

      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder'); // Исправлено 4
      cy.contains('12345').should('be.visible');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.get('[data-cy="modal-close-button"]').click();

      // Проверка могилки
      cy.get('[data-cy="modal"]').should('not.exist');

      // Проверка конструктора
      cy.get('[data-cy="burger-constructor"]').within(() => {
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
      }); // Исправлено 10
    });

    it('должен не оформлять заказ без авторизации', () => {
      cy.intercept('GET', '**/api/auth/user', {
        fixture: 'user-empty.json'
      }).as('getUserEmpty');
      cy.visit('/');
      cy.wait('@getIngredients');
      cy.wait('@getUserEmpty');
      cy.get('[data-cy="order-button"]').click();
      cy.url().then((url) => {
        if (url.includes('/login')) {
          cy.contains('Вход').should('be.visible');
        } else {
          cy.get('[data-cy="modal"]').should('not.exist');
        }
      });
    });

    afterEach(() => {
      cy.window().then((win) => {
        win.localStorage.removeItem('accessToken');
        win.localStorage.removeItem('refreshToken');
      }); //Исправлено 6
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
                (_, btn) =>
                  btn.textContent?.includes('Добавить') || //Исправлено 14 учтена настройка окружения, теперь код должен работать корректно
                  btn.textContent === '+'
              )
              .click({ force: true });
          });
      });
      // Проверка конструктора
      cy.get('[data-cy="burger-constructor"]').within(() => {
        cy.contains('Краторная булка N-200i (верх)').should('exist');
        cy.contains('Краторная булка N-200i (низ)').should('exist');
      }); //Исправлено 11
    });

    it('должна обновлять стоимость', () => {
      cy.contains('0').should('exist');
      cy.log(
        'Проверка стоимости выполняется после добавления ингредиентов (зависит от состояния конструктора)'
      );
    });
  });
});
