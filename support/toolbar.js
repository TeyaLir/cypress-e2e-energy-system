export function refresh() {
  // Рефреш внутри программы
  cy.get('.dx-icon-refresh')
    .click({ force: true });

  // Сообщение об успешном обновлении
  cy.get('.dx-toast-message')
    .should('be.visible')
    .and('have.text', 'Данные обновлены');
}

export function copy() {
  // Копировать строку
  cy.get('.dx-icon-copy')
    .click({ force: true });

  // Новая строка появилась в таблице
  cy.get('.dx-row-focused')
    .should('exist');
}

export function add() {
  // Добавить строку
  cy.get('.dx-icon-add')
    .click({ force: true });

  // Новая строка появилась в таблице
  cy.get('.dx-row-focused')
    .should('exist');
}

export function trash() {
  // Удалить
  cy.get('.dx-icon-trash')
    .click({ force: true });

  // Диалог подтверждения удаления
  cy.get('.dx-overlay-content > .dx-dialog-buttons')
    .should('be.visible')
    .find('.dx-toolbar-center')
    .children()
    .first()
    .find('.dx-button-content > span')
    .contains('Да')
    .click();

  // Диалог закрылся после подтверждения
  cy.get('.dx-overlay-content > .dx-dialog-buttons')
    .should('not.exist');
}

export function save() {
  // Сохранить изменения
  cy.get('.dx-icon-save')
    .click({ force: true });

  // Сообщение об успешном сохранении
  cy.get('.dx-toast-message')
    .should('be.visible')
    .and('have.text', 'Изменения данных прошли успешно');
}

export function settingsReset() {
  // Пользовательские настройки (шестерёнка)
  cy.get('.dx-icon-preferences')
    .click({ force: true });

  // Сброс к заводским настройкам
  cy.get('[title="Заводские настройки"]')
    .should('be.visible')
    .click();

  // Меню настроек закрыто
  cy.get('[title="Заводские настройки"]')
    .should('not.exist');
}