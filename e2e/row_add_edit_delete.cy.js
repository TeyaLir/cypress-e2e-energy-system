import { loginTest } from "../../support/loginTest";
import { input_EditGrid } from "../../support/inputs";
import { refresh, add, trash, save, settingsReset } from "../../support/toolbar";
import { sort, sortAfter, verticalScrollDown, verticalScrollUp } from "../../support/actions";
import { fillRow } from '../../support/rowHelpers';

const TEST_DATA = {
  NEW_ROW: {
    text: 'Тестовая строка 1',
    number1: 1111111111.11,
    number2: 111111111.111,
    integer: 42,
    boolean: 'true',
    json: '{}',
    uuid: '1e11f853-7138-4e1c-8268-057592ac2a98'
  },

  EDITED_ROW: {
    text: 'Редактируемая тестовая строка',
    number1: 1010101010.10,
    number2: 101010101.101,
    integer: 24,
    boolean: 'false',
    json: '{"test": "data"}',
    uuid: '2e22f222-7138-4e1c-8268-057592ac2a98'
  }
};

describe('Работа с таблицей: добавление, редактирование и удаление строк', () => {

  it('1. Добавление новой строки в таблицу', () => {
    loginTest();
    input_EditGrid();
    refresh();
    settingsReset();

    // Установка сортировки по возрастанию ID
    sort();
    sortAfter();
    verticalScrollUp();

    // Данные для новой строки из констант
    const row = [
      TEST_DATA.NEW_ROW.text,
      TEST_DATA.NEW_ROW.number1,
      TEST_DATA.NEW_ROW.number2,
      TEST_DATA.NEW_ROW.integer,
      TEST_DATA.NEW_ROW.boolean,
      TEST_DATA.NEW_ROW.json,
      TEST_DATA.NEW_ROW.uuid
    ];

    // Добавление строки
    add();

    // Фокусировка на новой строке
    cy.get('.dx-row-focused')
      .children()
      .eq(2)
      .click({ force: true });

    // Заполнение данных строки
    fillRow(row);

    save();

    // =============================================
    // Проверка наличия созданной строки в таблице
    // =============================================

    verticalScrollDown();

    // Проверка данных созданной строки в последней строке таблицы
    let columnIndex = 2;
    for (let i = 0; i < row.length; i++) {
      cy.get('[aria-rowindex]').last()
        .children()
        .eq(columnIndex++)
        .should('have.text', row[i]);
    }

    // Проверка после обновления страницы
    refresh();
    verticalScrollDown();

    let refreshColumnIndex = 2;
    for (let i = 0; i < row.length; i++) {
      cy.get('[aria-rowindex]').last()
        .children()
        .eq(refreshColumnIndex++)
        .should('have.text', row[i]);
    }
  });

  it('2. Редактирование существующей строки', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Установка сортировки
    sortAfter();
    sortAfter();
    verticalScrollDown();

    // Фокусировка на последней строке для редактирования
    cy.get('[aria-rowindex]').last()
      .children()
      .eq(2)
      .click({ force: true });

    // Данные для редактирования из констант
    const editRow = [
      TEST_DATA.EDITED_ROW.text,
      TEST_DATA.EDITED_ROW.number1,
      TEST_DATA.EDITED_ROW.number2,
      TEST_DATA.EDITED_ROW.integer,
      TEST_DATA.EDITED_ROW.boolean,
      TEST_DATA.EDITED_ROW.json,
      TEST_DATA.EDITED_ROW.uuid
    ];

    // Заполнение отредактированных данных
    fillRow(editRow);

    save();

    // =====================================
    // Проверка сохранения изменений
    // =====================================

    const checkRowData = [
      null,
      null,
      TEST_DATA.EDITED_ROW.text,
      TEST_DATA.EDITED_ROW.number1,
      TEST_DATA.EDITED_ROW.number2,
      TEST_DATA.EDITED_ROW.integer,
      TEST_DATA.EDITED_ROW.boolean,
      TEST_DATA.EDITED_ROW.json,
      TEST_DATA.EDITED_ROW.uuid
    ];

    for (let j = 0; j < checkRowData.length; j++) {
      if (checkRowData[j] !== null) {
        cy.get('[aria-rowindex]').last()
          .children()
          .eq(j)
          .should('have.text', checkRowData[j]);
      }
    }

    // =====================================
    // Проверка после обновления
    // =====================================

    refresh();
    verticalScrollDown();

    for (let j = 0; j < checkRowData.length; j++) {
      if (checkRowData[j] !== null) {
        cy.get('[aria-rowindex]').last()
          .children()
          .eq(j)
          .should('have.text', checkRowData[j]);
      }
    }
  });

  it('3. Удаление строки из таблицы', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Установка сортировки
    sortAfter();
    sortAfter();
    verticalScrollDown();

    // Проверка текста в строке перед удалением
    cy.get('[aria-rowindex]').last()
      .children()
      .eq(2)
      .should('have.text', TEST_DATA.EDITED_ROW.text);

    // Выделение строки для удаления
    cy.get('[aria-rowindex]').last()
      .children()
      .eq(0)
      .click({ force: true });

    trash();
    save();

    // Проверка, что строка с отредактированным текстом удалена
    cy.contains('[aria-rowindex]', TEST_DATA.EDITED_ROW.text)
      .should('not.exist');

    // Проверка после обновления страницы
    refresh();
    verticalScrollDown();

    cy.contains('[aria-rowindex]', TEST_DATA.EDITED_ROW.text)
      .should('not.exist');
  });

});