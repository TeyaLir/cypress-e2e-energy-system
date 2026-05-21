import { loginTest } from '../../../../support/loginTest.js'
import { pickMonth, pickMonthInPopup, pickDayInPopup } from '../../../../support/pickDate.js'
import { add, save } from '../../../../support/toolbar'
import { fillRow, checkRow } from '../../../../support/rowHelpers';

describe('Проверка расчётов баланса тепла турбоагрегата №3', () => {
  // 1) Показатель 22 (ВП температура выхода) переносится из ежедневного учёта показателей турбин — показатель 39 (температура воды выход ВП)
  // 2) Показатель 26 (энтальпия пара 2 отбора) из ежедневного учёта показателей турбин — показатель 20 (энтальпия пара произв отбора 2, 5)
  // 3) Показатель 27 (темп хол воды из общ данных) из ежедневного учёта общестанционных ТЭП — показатель 3 (температура холодной воды)
  // 4) Остальные показатели заводим руками, на их основании пересчитываются показатели: 4, 5, 8, 10, 15, 19, 21.

  it('1. Ежедневный учёт показателей работы турбоагрегатов', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный учёт показателей работы турбоагрегатов').click();

    pickMonth(2021, "окт.");

    // Выбор турбины № 3
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true });
    cy.get('.dx-scrollview-content')        // ← новая цепочка с cy.
      .find('.dx-list-item-content')
      .contains('турбины № 3')
      .click({ force: true });

    // Создание строки
    add();

    cy.get('.dx-popup-content')
      .find('.dx-calendar-cell')
      .get('[data-value="2021/10/02"]')
      .click({ force: true });
    cy.get('.dx-toolbar-after')
      .contains('OK')
      .click({ force: true });

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    cy.get('.dx-focused')
      .click();

    const row_ta = [{ select: 'одноступенчатый' }, 0, 24, null, 4, 1750.76, null, 8631, null, 132.2, 551, null, 1050, 1280, 180, 219, null, 0, 104, null, 1.2, 104, null, 1110, 156, 551, null, 1110, 156, 551, null, 1857, 800, null, 0.025, 10.6, 20.1, 60, 33.1]

    // Заполнение данных строки
    fillRow(row_ta);

    save();

    // Проверка сохранения строки
    const checkRow_ta = [{ date: '02.10.2021' }, 'одноступенчатый', 0, 24, 24, 4, 1750.76, 72.9, 8631, 359.6, 132.2, 551, 829.46, 1050, 1280, 180, 219, 225.53, 0, 104, 644, 1.2, 104, 641, 1110, 156, 551, 621, 1110, 156, 551, 621, 1857, 800, 1057, 0.025, 10.6, 20.1, 60, 33.1]

    checkRow(checkRow_ta);
  });

  it('2. Ежедневный учёт и расчёт общих показателей за месяц', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный учёт и расчёт общих показателей за месяц').click();

    pickMonth(2021, "окт.");

    // Создание строки
    add();

    cy.get('.dx-popup-content')
      .find('.dx-calendar-cell')
      .get('[data-value="2021/10/02"]')
      .click({ force: true });
    cy.get('.dx-toolbar-after')
      .contains('OK')
      .click({ force: true });

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    cy.get('.dx-focused')
      .click();

    const rows_tec = [24, 9.3, 10.6, 760.3, 0.698, 8183, 879.384, null, 873.474, null, 0, 0, 0, null, null, 34, 18, 10, 20, 30, 40, null, 10, 10, null, 0, null, 10, 20, 30, 40, 0, 0, 0, 0, 0, 0, 9762.489, 5.8, null]

    // Заполнение данных строки
    fillRow(rows_tec);

    save();

    // Прокрутка влево для проверки
    cy.get('.dx-scrollable-container').scrollTo('left');

    // Проверка сохранения строки
    const checkRows_tec = [{ date: '02.10.2021' }, 24, 9.3, 10.6, 760.3, 0.698, 8183, 879.384, 1028, 873.474, 1021, 0, 0, 0, 0, 1021, 34, 18, 10, 20, 30, 40, 100, 10, 10, 1750.76, 0, 1750.76, 10, 20, 30, 40, 0, 0, 0, 0, 0, 0, 9762.489, 5.8, 0.993279]

    checkRow(checkRows_tec);
  });

  it('3. Баланс тепла за сутки - проверка колонки №18 "ВП Температура выхода град С"', () => {
    // Показатель 22 (ВП температура выхода) переносится из ежедневного учёта показателей турбин — показатель 39

    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Баланс тепла за сутки').click();

    pickDayInPopup('02', 10, 2021);

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(22 + 3)
      .find('div')
      .then(($col) => {
        const col18 = $col.text();

        cy.contains('Ежедневные отчёты').click();
        cy.contains('Ежедневный учёт показателей работы турбоагрегатов').click();

        pickMonthInPopup(2021, 'окт.');

        // Выбор турбины № 3
        cy.get('input[autocomplete="off"]')
          .first()
          .click({ force: true })
        cy.get('.dx-scrollview-content')
          .find('.dx-list-item-content')
          .contains('турбины № 3')
          .click({ force: true });

        // Проверка значения в строке
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(1)
          .children()
          .eq(39)
          .find('div')
          .should('have.text', col18);
      });
  });

  it('4. Баланс тепла за сутки - проверка колонки №22 "Энтальпия пара II отбора"', () => {
    // Показатель 26 (энтальпия пара 2 отбора) из ежедневного учёта показателей турбин — показатель 20

    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Баланс тепла за сутки').click();

    pickDayInPopup('02', 10, 2021);

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(26 + 3)
      .find('div')
      .then(($col) => {
        const col22 = $col.text();

        cy.contains('Ежедневные отчёты').click();
        cy.contains('Ежедневный учёт показателей работы турбоагрегатов').click();

        pickMonthInPopup(2021, 'окт.');

        // Выбор турбины № 3
        cy.get('input[autocomplete="off"]')
          .first()
          .click({ force: true })
        cy.get('.dx-scrollview-content')
          .find('.dx-list-item-content')
          .contains('турбины № 3')
          .click({ force: true });

        // Проверка значения в строке
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(1)
          .children()
          .eq(20)
          .find('div')
          .should('have.text', col22);
      });
  });

  it('5. Баланс тепла за сутки - проверка колонки №23 "Температура холодной воды"', () => {
    // Показатель 27 (темп хол воды) из ежедневного учёта общих показателей — показатель 3

    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Баланс тепла за сутки').click();

    pickDayInPopup('02', 10, 2021);

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(27 + 3)
      .find('div')
      .then(($col) => {
        const col23 = $col.text();

        cy.contains('Ежедневные отчёты').click();
        cy.contains('Ежедневный учёт и расчёт общих показателей за месяц').click();

        pickMonthInPopup(2021, 'окт.');

        // Проверка значения в строке
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(1)
          .children()
          .eq(3)
          .find('div')
          .should('have.text', col23);
      });
  });
});