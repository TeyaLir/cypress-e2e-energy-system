import { loginTest } from "../../../support/loginTest";
import { input_EditGrid } from "../../../support/inputs";
import { refresh } from "../../../support/toolbar";
import { reloadBrowserPage } from "../../../support/actions";

const MOUSE = {
  VERTICAL_POSITION: 25, // Y-координата для перемещения мыши
  DRAG_DISTANCE: 140     // Расстояние для перетаскивания разделителя
};

describe('Изменение ширины колонки ID в таблице', () => {

  it('Изменение ширины колонки ID сохраняется после обновления и перезагрузки', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Получение исходной ширины первой колонки и колонки ID
    cy.get('.dx-header-row').children().eq(0)
      .invoke('css', 'width')
      .then((firstColWidth) => {
        cy.get('.dx-header-row').children().eq(1)
          .invoke('css', 'width')
          .then((idColWidth) => {
            const initialWidth = idColWidth;
            const totalWidth = parseInt(firstColWidth) + parseInt(idColWidth);

            cy.log(`Исходная ширина колонки ID: ${initialWidth}`);
            cy.log(`Позиция разделителя: ${totalWidth}px`);

            // Перемещение мыши к разделителю колонок
            cy.get('.dx-bordered-top-view')
              .realMouseMove(totalWidth, MOUSE.VERTICAL_POSITION);

            // Перетаскивание разделителя для изменения ширины
            cy.get('.dx-datagrid-columns-separator')
              .realMouseDown()
              .realMouseMove(MOUSE.DRAG_DISTANCE, 0)
              .realMouseUp();

            // Проверка: ширина изменилась
            cy.get('.dx-header-row').children().eq(1)
              .invoke('css', 'width')
              .then((widthAfterChange) => {
                cy.log(`Ширина после изменения: ${widthAfterChange}`);
                expect(widthAfterChange).not.to.equal(initialWidth);

                // Проверка: ширина сохранилась после обновления таблицы
                refresh();
                cy.get('.dx-header-row').children().eq(1)
                  .invoke('css', 'width')
                  .then((widthAfterRefresh) => {
                    cy.log(`Ширина после обновления таблицы: ${widthAfterRefresh}`);
                    expect(widthAfterRefresh).to.equal(widthAfterChange);

                    // Проверка: ширина сохранилась после полной перезагрузки страницы
                    reloadBrowserPage();
                    cy.get('.dx-header-row').children().eq(1)
                      .invoke('css', 'width')
                      .then((widthAfterReload) => {
                        cy.log(`Ширина после перезагрузки страницы: ${widthAfterReload}`);
                        expect(widthAfterReload).to.equal(widthAfterChange);
                      });
                  });
              });
          });
      });
  });

});