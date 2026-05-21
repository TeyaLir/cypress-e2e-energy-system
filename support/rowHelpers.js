/**
 * Вспомогательные функции для работы со строками таблицы DevExtreme DataGrid.
 *
 * Поддерживаемые форматы значений во всех функциях:
 *   - строка/число:        'текст' | 42 | 3.14
 *   - дата:                { date: '01.01.2022' }
 *   - выпадающий список:   { select: 'Значение' }
 *   - булево (чекбокс):    true | false
 *   - пропустить ячейку:   null
 */

// ─────────────────────────────────────────────
//  Заполнение строки
// ─────────────────────────────────────────────

/**
 * Заполняет строку таблицы переданными данными.
 * Начинает с текущего сфокусированного поля и переходит по Tab.
 *
 * @param {Array} row - массив значений для заполнения ячеек
 */
export function fillRow(row) {
  for (let j = 0; j < row.length; j++) {
    if (row[j] !== null) {
      if (typeof row[j] === 'object' && ('date' in row[j])) {
        // Обработка даты
        cy.focused()
          .should('match', 'input[autocomplete="off"]')
          .type('{selectall}' + row[j].date, { delay: 10, force: true });
      } else if (typeof row[j] === 'object' && ('select' in row[j])) {
        // Обработка выпадающего списка
        cy.focused()
          .should('match', 'input[autocomplete="off"]')
          .click({ force: true });
        cy.get('.dx-scrollview-content')
          .find('.dx-list-item-content')
          .contains(row[j].select)
          .click({ force: true });
      } else if (typeof row[j] === 'boolean') {
        // Обработка чекбокса
        cy.focused().should('match', 'div').find('input').then(($input) => {
          const expectedValue = row[j] ? 'true' : 'false';
          if ($input.val() !== expectedValue) {
            cy.focused().click({ force: true });
          }
        });
      } else {
        // Обычное значение (текст, число)
        cy.focused()
          .should('match', 'input[autocomplete="off"]')
          .type('{selectall}' + row[j], { delay: 10, force: true });
      }

      // Навигация Tab, кроме последнего элемента
      if (j !== row.length - 1) {
        cy.focused().realPress('Tab');
      }
    }
  }
}

// ─────────────────────────────────────────────
//  Проверка строк
// ─────────────────────────────────────────────

/**
 * Проверяет данные строки таблицы через селектор .dx-data-row.
 *
 * @param {Array} expectedData - массив ожидаемых значений
 * @param {number} rowIndex - индекс строки среди .dx-data-row (по умолчанию 1)
 */
export function checkRow(expectedData, rowIndex = 1) {
  for (let j = 0; j < expectedData.length; j++) {
    if (expectedData[j] !== null) {
      _assertCell(
        cy.get('.dx-row').filter('.dx-data-row').eq(rowIndex).children().eq(j),
        expectedData[j]
      );
    }
  }
}

/**
 * Проверяет данные строки таблицы через атрибут aria-rowindex.
 * Используется когда строка не имеет класса .dx-data-row.
 *
 * @param {Array} expectedData - массив ожидаемых значений
 * @param {number} ariaRowIndex - значение атрибута aria-rowindex (по умолчанию 1)
 */
export function checkRowByIndex(expectedData, ariaRowIndex = 1) {
  for (let j = 0; j < expectedData.length; j++) {
    if (expectedData[j] !== null) {
      _assertCell(
        cy.get(`[aria-rowindex="${ariaRowIndex}"]`).children().eq(j),
        expectedData[j]
      );
    }
  }
}

/**
 * Проверяет данные нескольких строк таблицы через селектор .dx-data-row.
 * Принимает массив массивов — каждый внутренний массив соответствует одной строке.
 *
 * @param {Array[]} expectedDataArray - массив массивов ожидаемых значений
 * @param {number} startRowIndex - индекс первой строки (по умолчанию 1)
 */
export function checkRows(expectedDataArray, startRowIndex = 1) {
  for (let i = 0; i < expectedDataArray.length; i++) {
    checkRow(expectedDataArray[i], startRowIndex + i);
  }
}

// ─────────────────────────────────────────────
//  Внутренняя функция проверки ячейки
// ─────────────────────────────────────────────

/**
 * Проверяет значение одной ячейки таблицы.
 * @param {Cypress.Chainable} td - элемент ячейки
 * @param {*} value - ожидаемое значение
 */
function _assertCell(td, value) {
  if (typeof value === 'object' && ('date' in value)) {
    // Проверка даты
    td.should('have.text', value.date);
  } else if (typeof value === 'object' && ('select' in value)) {
    // Проверка выпадающего списка
    td.should('have.text', value.select);
  } else if (typeof value === 'boolean') {
    // Проверка чекбокса
    td.find('input')
      .should('have.value', value ? 'true' : 'false');
  } else {
    // Проверка обычного значения (текст, число)
    td.should('have.text', value);
  }
}