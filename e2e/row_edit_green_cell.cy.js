import { loginTest } from "../../support/loginTest";
import { input_EditGridLookUp } from "../../support/inputs";
import { refresh } from "../../support/toolbar";
import { fillRow } from '../../support/rowHelpers';

describe('Изменение цвета строки при редактировании табличных данных', () => {

  it('Проверка цветового выделения при редактировании таблицы.', () => {
    loginTest();
    input_EditGridLookUp();
    refresh();

    // Получить первый ряд в таблице
    cy.get('[aria-rowindex="1"]')
      .children()
      .eq(1)
      .click({ force: true });

    // Данные для редактирования строки
    const row = [
      'Редактируемая тестовая строка',
      { select: 'Тестовое значение 1' }
    ];

    // Заполнение данных строки
    fillRow(row);

    // ====================================================
    //    Проверить, что изменённая строка стала зелёной
    // ====================================================

    for (let i = 0; i < row.length; i++) {
      cy.get('[aria-rowindex="1"]')
        .children()
        .eq(i + 1)
        .should('have.css', 'background-color', 'rgba(139, 195, 74, 0.32)');
    }
  });
});