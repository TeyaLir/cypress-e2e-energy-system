export function pickDay(day, month, year) {
  // Ожидание появления поля выбора даты
  cy.get('.dx-texteditor-input-container > input')
    .eq(2)
    .should('be.visible')
    .click({ force: true });

  // Переход к выбору года
  cy.get('.dx-calendar-navigator > .dx-button-has-text > .dx-button-content')
    .click({ force: true });

  if (year <= 2019) {
    cy.get('.dx-calendar-navigator-previous-view > .dx-button-content')
      .click({ force: true });
    // Выбор года
    cy.get(`[data-value="${year}/01/01"]`)
      .eq(0)
      .click({ force: true });
    // Выбор месяца
    cy.get(`[data-value="${year}/${month}/01"]`)
      .click({ force: true });
    // Выбор дня
    cy.get(`[data-value="${year}/${month}/${day}"]`)
      .eq(0)
      .click({ force: true });
  } else {
    // Выбор года
    cy.get(`[data-value="${year}/01/01"]`)
      .click({ force: true });
    // Выбор месяца
    cy.get(`[data-value="${year}/${month}/01"]`)
      .click({ force: true });
    // Выбор дня
    cy.get(`[data-value="${year}/${month}/${day}"]`)
      .eq(0)
      .click({ force: true });
  }
}

export function pickMonth(year, month) {
  if (year <= 2020) {
    // Открытие выпадающего списка выбора месяца
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon')
      .should('be.visible')
      .click({ force: true });
    cy.get('.dx-calendar-navigator > .dx-button-has-text > .dx-button-content')
      .click({ force: true });
    cy.get('.dx-icon-chevronleft')
      .click({ force: true });
    cy.get('.dx-calendar-navigator-previous-view > .dx-button-content')
      .click({ force: true });
    // Выбор года
    cy.get(`td[data-value="${year}/01/01"]`)
      .click({ force: true });
    // Выбор месяца
    cy.get('span')
      .contains(month)
      .click({ force: true });
  } else {
    // Открытие выпадающего списка выбора месяца
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon')
      .should('be.visible')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button')
      .click({ force: true });
    // Выбор года
    cy.get(`td[data-value="${year}/01/01"]`)
      .click({ force: true });
    // Выбор месяца
    cy.get('span')
      .contains(month)
      .click({ force: true });
  }

  // Проверка закрытия календаря после выбора
  cy.get('.dx-calendar-caption-button')
    .should('not.exist');
}

export function pickDate(year, month) {
  // Ожидание появления кнопки выбора периода
  cy.get('.dx-button')
    .filter('.date-button')
    .contains('Месяц')
    .should('be.visible');

  if (year <= 2020) {
    cy.get('.dx-button')
      .filter('.date-button')
      .contains('Месяц')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button')
      .click({ force: true });
    cy.get('.dx-icon-chevronleft')
      .click({ force: true });
    // Выбор года
    cy.get(`td[data-value="${year}/01/01"]`)
      .click({ force: true });
    // Выбор месяца
    cy.get('span')
      .contains(month)
      .click({ force: true });
    cy.get('.dx-button-text')
      .contains('OK')
      .click({ force: true });
  } else {
    cy.get('.dx-button')
      .filter('.date-button')
      .contains('Месяц')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button')
      .click({ force: true });
    // Выбор года
    cy.get(`td[data-value="${year}/01/01"]`)
      .click({ force: true });
    // Выбор месяца
    cy.get('span')
      .contains(month)
      .click({ force: true });
    cy.get('.dx-button-text')
      .contains('OK')
      .click({ force: true });
  }
}

export function pickDayInsideTable(day, month, year) {
  // Ожидание появления попапа с календарём
  cy.get('.dx-overlay-shader > .dx-overlay-content > .dx-popup-content')
    .should('be.visible');

  // Выбор дня в календаре
  cy.get('.dx-calendar-body')
    .find(`[data-value="${year}/${month}/${day}"]`)
    .click({ force: true });

  // Переход в ручной режим ввода
  cy.get('.dx-button-content > .dx-button-text')
    .contains('Вручную')
    .should('be.visible')
    .click({ force: true });
}

export function pickDayInsideTableAfter(day, month, year) {
  // Ожидание появления попапа с календарём
  cy.get('.dx-overlay-shader > .dx-overlay-content > .dx-popup-content')
    .should('be.visible');

  // Выбор дня в календаре
  cy.get('.dx-calendar-body')
    .find(`[data-value="${year}/${month}/${day}"]`)
    .click({ force: true });

  // Подтверждение выбора
  cy.get('.dx-toolbar-after')
    .contains('OK')
    .click({ force: true });

  // Попап закрылся после подтверждения
  cy.get('.dx-overlay-shader > .dx-overlay-content > .dx-popup-content')
    .should('not.exist');
}

/**
 * Выбор месяца через попап с кнопкой "Месяц".
 *
 * @param {number} year - год
 * @param {string} month - название месяца (например "окт.")
 */
export function pickMonthInPopup(year, month) {
  // Открытие попапа выбора периода
  cy.get('.dx-button')
    .filter('.date-button')
    .contains('Месяц')
    .click({ force: true });

  // Переход к выбору года
  cy.get('.dx-popup-wrapper > .dx-overlay-content > .dx-popup-content > #calendar-container > .dx-calendar-navigator > .dx-button-has-text > .dx-button-content')
    .click({ force: true });

  // Выбор года
  cy.get(`td[data-value="${year}/01/01"]`)
    .click({ force: true });

  // Выбор месяца
  cy.get('span')
    .contains(month)
    .click({ force: true });

  // Подтверждение выбора
  cy.get('.dx-button-text')
    .contains('OK')
    .click({ force: true });
}

/**
 * Выбор конкретного дня через попап с кнопкой "День".
 *
 * @param {string} day - день (например "02")
 * @param {number} month - номер месяца (например 10)
 * @param {number} year - год
 */
export function pickDayInPopup(day, month, year) {
  cy.get('.dx-button')
    .filter('.date-button')
    .contains('День')
    .click({ force: true });

  cy.get('.dx-calendar-caption-button')
    .click({ force: true });

  // Выбор года
  cy.get(`td[data-value="${year}/01/01"]`)
    .click({ force: true });

  // Выбор месяца
  cy.get(`td[data-value="${year}/${month}/01"]`)
    .click({ force: true });

  // Выбор дня
  cy.get(`:nth-child(1) > [data-value="${year}/${month}/${day}"]`)
    .click({ force: true });

  cy.get('.dx-button-text')
    .contains('OK')
    .click({ force: true });
}

export function enterManualMode() {
  cy.get('.info-container')
    .find('.dx-button-content')
    .contains('Вручную')
    .click({ force: true });
  cy.get('.dx-focused')
    .click();
}