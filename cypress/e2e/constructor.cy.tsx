/// <reference types="cypress" />

const API = 'https://norma.nomoreparties.space/api';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', `${API}/orders/all`, {
      body: { success: true, orders: [], total: 0, totalToday: 0 }
    }).as('getFeed');
  });

  it('Добавляет ингредиент из списка в конструктор', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('Булки');
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Выберите булки').should('not.exist');
    cy.contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  it('Открывает и закрывает модалку деталей ингредиента', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('Говяжий метеорит (отбивная)').click();
    cy.contains('Детали ингредиента');
    cy.contains('Говяжий метеорит (отбивная)').should('be.visible');

    cy.get('button').contains('Оформить заказ').should('exist');
    cy.get('body').type('{esc}');
    cy.contains('Говяжий метеорит (отбивная)').should('exist');
  });

  it('В модалке отображаются данные кликнутого ингредиента', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('Соус традиционный галактический').click();
    cy.contains('Соус традиционный галактический').should('be.visible');
    cy.contains('Калории, ккал').siblings().contains('100');
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });
      cy.setCookie('accessToken', 'test-access-token');

      cy.intercept('GET', `${API}/auth/user`, {
        body: {
          success: true,
          user: { name: 'Test User', email: 'test@example.com' }
        }
      }).as('getUser');

      cy.intercept('POST', `${API}/orders`, { fixture: 'order.json' }).as(
        'postOrder'
      );
    });

    afterEach(() => {
      cy.clearLocalStorage('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('Оформляет заказ и очищает конструктор', () => {
      cy.visit('/');
      cy.wait(['@getIngredients']);

      cy.contains('Краторная булка N-200i')
        .parents('li')
        .within(() => {
          cy.contains('Добавить').click();
        });

      cy.contains('Говяжий метеорит (отбивная)')
        .parents('li')
        .within(() => {
          cy.contains('Добавить').click();
        });

      cy.get('button').contains('Оформить заказ').click();

      cy.wait('@postOrder');
      cy.contains('идентификатор заказа');
      cy.contains('12345').should('be.visible');

      cy.get('body').type('{esc}');

      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    });
  });
});
