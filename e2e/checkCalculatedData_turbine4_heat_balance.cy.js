import { loginTest } from '../../../../support/loginTest.js'
import { pickDay, pickMonth, enterManualMode } from '../../../../support/pickDate.js'
import { add, save } from "../../../../support/toolbar"
import { fillRow, checkRow, checkRows } from '../../../../support/rowHelpers';

let turb4;
let turb9;
let turb34;
let bal18;
let bal11;

let ved1;
let ved2;
let ved3;
let ved4;
let ved5;
let ved6;
let ved7;

describe('Проверка расчётов баланса тепла для турбоагрегатора №4', () => {

  it('1.1 Ежедневный учёт показателей работы турбоагрегатов', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный учёт показателей работы турбоагрегатов').click();

    pickMonth(2023, "авг.");

    // Выбор 'турбины № 4'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true });
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains('турбины № 4')
      .click({ force: true });

    // Создание строки
    add();
    pickDay('01', '08', 2023);
    enterManualMode();


    const row_turbine = [{ select: 'одноступенчатый' }, 0, 20, null, 4, 1600.5, null, 7800, null, 120.5, 500, null, 950, 1150, 160, 200, null, 0, 95, null, 1.1, 95, null, 1000, 140, 500, null, 1000, 140, 500, null, 1700, 720, null, 0.023, 9.8, 18.5, 55, 30.2]

    // Заполнение данных строки
    fillRow(row_turbine);

    save();

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRow_turbine = [{ date: '01.08.2023' }, 'одноступенчатый', 0, 20, 20, 4, 1600.5, 66.7, 7800, 325.0, 120.5, 500, 750.8, 950, 1150, 160, 200, 203.8, 0, 95, 580, 1.1, 95, 578, 1000, 140, 500, 560, 1000, 140, 500, 560, 1700, 720, 950, 0.023, 9.8, 18.5, 55, 30.2]

    checkRow(checkRow_turbine, 0);
  });

  it('1.2 Ежедневный учёт и расчёт общих показателей за месяц', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный учёт и расчёт общих показателей за месяц').click();

    pickMonth(2023, "авг.");

    // Создание строки
    add();
    pickDay('01', '08', 2023);
    enterManualMode();

    const rows_generalMetrics = [
      [20, 8.5, 9.8, 690.5, 0.635, 7400, 795.3, null, 790.2, null, 0, 0, 0, null, null, 30, 16, 9, 18, 27, 36, null, 9, 9, null, 0, null, 9, 18, 27, 36, 0, 0, 0, 0, 0, 0, 8800.8, 5.2, null]
    ]

    // Заполнение данных строки
    fillRow(rows_generalMetrics);

    save();

    // скролл влево
    cy.get('.dx-scrollable-container').scrollTo('left');

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRows_generalMetrics = [
      [{ date: '01.08.2023' }, 20, 8.5, 9.8, 690.5, 0.635, 7400, 795.3, 930, 790.2,
        925, 0, 0, 0, 0, 925, 30, 16, 9, 18, 27, 36, 90, 9, 9, 1600.5, 0, 1600.5,
        9, 18, 27, 36, 0, 0, 0, 0, 0, 0, 8800.8, 5.2, 0.985]
    ]

    checkRows(checkRows_generalMetrics);
  });

  it('1.3 Баланс тепла за сутки', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Баланс тепла за сутки').click();

    pickDay('01', '08', 2023);

    // получить строку
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(4)
      .click({ force: true });

    const row_heatBalance = [8963, 0, 0, null, null, 0, 0, null, 0, null, 1763, 10, 330, 1110, null, 1110, null, 1423, null, 945, 22.4, 33.1, null, 0, null, null, null]

    // Заполнение данных строки
    fillRow(row_heatBalance);

    save();

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRow_heatBalance = [4, '01.08.2023', 'одноступенчатый', 20, 8100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 9, 300, 1000, 535, 1000, 535, 1280, 685, 850, 20.2, 30.2, 86, 0, 940, 580, 9.8]

    checkRow(checkRow_heatBalance, 0);
  });

  // =======================================================================
  // 2. Получение значений ячеек
  // =======================================================================

  it('2.1 Получение ежедневного учёта показателей работы турбоагрегатов', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный учёт показателей работы турбоагрегатов').click();

    pickMonth(2023, "авг.");

    // выбор 'турбины № 4'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains('турбины № 4')
      .click({ force: true });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(4)
      .find('div')
      .then(($col) => {
        turb4 = $col.text();
        cy.log('Колонка № 4 = ' + turb4)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(9)
      .find('div')
      .then(($col) => {
        turb9 = $col.text();
        cy.log('Колонка № 9 = ' + turb9)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(34)
      .find('div')
      .then(($col) => {
        turb34 = $col.text();
        cy.log('Колонка № 34 = ' + turb34)
      });
  });

  it('2.2 Получение суточных показателей баланса тепла', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Баланс тепла за сутки').click();

    pickDay('01', '08', 2023);

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(18 + 3)
      .find('div')
      .then(($col) => {
        bal18 = $col.text();
        cy.log('Колонка № 18 = ' + bal18)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(11 + 3)
      .find('div')
      .then(($col) => {
        bal11 = $col.text();
        cy.log('Колонка № 11 = ' + bal11)
      });
  });

  it('2.3 Получение показателей ведомости паров турбоагрегатов', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ведомость паров турбоагрегатов').click();

    pickMonth(2023, "авг.");

    // выбор  турбины № 4
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' турбины № 4')
      .click({ force: true });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(1)
      .find('div')
      .then(($col) => {
        ved1 = $col.text();
        cy.log('Колонка № 1 = ' + ved1)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(2)
      .find('div')
      .then(($col) => {
        ved2 = $col.text();
        cy.log('Колонка № 2 = ' + ved2)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(3)
      .find('div')
      .then(($col) => {
        ved3 = $col.text();
        cy.log('Колонка № 3 = ' + ved3)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(4)
      .find('div')
      .then(($col) => {
        ved4 = $col.text();
        cy.log('Колонка № 4 = ' + ved4)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(5)
      .find('div')
      .then(($col) => {
        ved5 = $col.text();
        cy.log('Колонка № 5 = ' + ved5)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(6)
      .find('div')
      .then(($col) => {
        ved6 = $col.text();
        cy.log('Колонка № 6 = ' + ved6)
      });

    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(7)
      .find('div')
      .then(($col) => {
        ved7 = $col.text();
        cy.log('Колонка № 7 = ' + ved7)
      });
  });

  // =======================================================================
  // 3. Проверка вычисленных данных в форме "Ведомость паров турбоагрегатов"
  // =======================================================================

  it('3.1 Проверка значений - колонка №1', () => {
    cy.log('Ведомость паров турбоагрегатов - Колонка № 1 = ' + ved1)
    cy.log('Ежедневный учёт показателей работы турбоагрегатов - Колонка № 9 = ' + turb9)

    if (ved1 == turb9) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.2 Проверка значений - колонка №2', () => {
    cy.log('Ведомость паров турбоагрегатов - Колонка № 2 = ' + ved2)

    if (ved2 == 0) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.3 Проверка значений - колонка №3', () => {
    const value = (+turb34 / +turb4).toFixed(1)

    cy.log('Ведомость паров турбоагрегатов - Колонка № 3 = ' + ved3)
    cy.log('Ежедневный учёт показателей работы турбоагрегатов - колонка № 34 / колонка № 4 = ' + value)

    if (ved3 == value) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.4 Проверка значений - колонка №4', () => {
    const value = (+bal18 / 24).toFixed(1)

    cy.log('Ведомость паров турбоагрегатов - Колонка № 4 = ' + ved4)
    cy.log('Баланс тепла за сутки - Колонка № 18 = ' + value)

    if (ved4 == value) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.5 Проверка значений - колонка №5', () => {
    const value = (+bal11 / 24).toFixed(1)

    cy.log('Ведомость паров турбоагрегатов - Колонка № 5 = ' + ved5)
    cy.log('Баланс тепла за сутки - Колонка № 11 = ' + value)

    if (ved5 == value) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.6 Проверка значений - колонка №6', () => {
    const col6 = (+ved4 - +ved5).toFixed(1);

    cy.log('Ведомость паров турбоагрегатов - Колонка № 6 = ' + ved6)
    cy.log('Ведомость паров турбоагрегатов - высчитанное значение = ' + col6)

    if (ved6 == col6) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });

  it('3.7 Проверка значений - колонка №7', () => {
    const value = (((+bal18 - +bal11) / +bal18) * 100).toFixed(2);

    cy.log('Ведомость паров турбоагрегатов - Колонка № 7 = ' + ved7)
    cy.log('Вычисленное значение = ' + value)

    if (ved7 == value) {
      cy.log('Значения равны')
    } else {
      cy.log(reportError('Значения не равны'))
    }
  });
});