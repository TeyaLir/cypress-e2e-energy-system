import { loginTest } from '../../../../support/loginTest.js'
import { pickDay, pickMonth, pickDayInsideTable, pickDayInsideTableAfter } from '../../../../support/pickDate.js'
import { refresh, add, save } from "../../../../support/toolbar"
import { fillRow, checkRow, checkRowByIndex, checkRows } from '../../../../support/rowHelpers';

describe('Проверка расчётов баланса пара первой линии', () => {

  it('1.1 Создание и проверка ряда - Мониторинг показателей турбоагрегатов (турбоагрегат 2)', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Мониторинг показателей турбоагрегатов').click();

    pickMonth(2022, "май");

    // выбор 'турбоагрегата № 2'
    cy.get('.indicators > p')
      .contains('Показатели работы')
      .next()
      .find('.dx-texteditor-buttons-container')
      .click({ force: true });
    cy.get('.dx-scrollview-content > :nth-child(1) > .dx-item-content')
      .contains('турбоагрегата № 2')
      .click({ force: true });

    // =====================================
    //        Создание строки
    // =====================================

    add();

    const rows_turbineData = [
      [{ select: 'конденсационный' }, 8, 16, null, 24, 425.350, null, 2850, null, 88.5, 615, null, 680, 2875, 185.7, 195, null, 1.5, 120, null, 0.89, 105, null, 1250, 920, null, 1, 0, 0, null, 850],
    ]

    for (let i = 0; i < rows_turbineData.length; i++) {

      if (i === 0) {
        pickDayInsideTable(`02`, '05', 2022);
      } else {
        pickDayInsideTableAfter(`0${i + 1}`, '05', 2022);
      }

      // Активация поля ввода
      cy.get('.dx-focused')
        .click();

      // Заполнение данных строки
      fillRow(rows_turbineData);
    }

    save();

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRows_turbineData = [
      [null, { date: '02.05.2022' }, 'конденсационный', 8, 16, 24, 24, '425,350', '17,7', '2 850', '118,8', '88,5', 615, '945,25', 680, '2 875,0', '185,7', 195, '199,35', '1,5', 120, 715, '0,89', 105, 715, '1 250', 920, 305, '1,0000', '0,0', '0,0', '0,0', '850,0']
    ]

    checkRows(checkRows_turbineData, 1);
  });

  it('1.2 Создание и проверка ряда - Учёт и расчёт общих показателей за месяц', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Учёт и расчёт общих показателей за месяц').click();

    pickMonth(2022, "май");

    // =====================================
    //        Создание строки
    // =====================================

    add();

    const row_generalMetrics = [24, 18, 20.5, 845.2, 0.725, 9050, 225.415, null, 235.820, null, 0, 0, 0, null, null, 8, 6, 32, 0, 0, 0, null, 0, 0, null, 108.340, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9850.150, 3.485, null]

    pickDayInsideTable(`02`, '05', 2022);

    // Активация поля ввода
    cy.get('.dx-focused')
      .click();

    // Заполнение данных строки
    fillRow(row_generalMetrics);

    save();

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRow_generalMetrics = [null, { date: '02.05.2022' }, 24, '18,0', '20,5', '845,2', '0,725', '9 050', '225,415', '260,0', '235,820', '272,500', '0,0', 0, '0,0', '0,0', 272, '18,9', '18,9', 32, 0, 0, 0, 32, 0, 0, '425,350', '108,340', 290, 0, 0, 0, 0, '0,000', '0,000', '0,000', null, 0, 0, '9 850,150', '3,485', '1,05']

    checkRow(checkRow_generalMetrics);
  });

  it('1.3 Создание и проверка ряда - Ежедневный мониторинг часов работы основного оборудования (энергоблок 1 работа, турбоагрегат 2 работа)', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный мониторинг часов работы основного оборудования').click();

    pickMonth(2022, "май");

    add();

    // Обнуление значений
    const rows_mainHours0 = [
      [0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0]
    ]

    for (let i = 0; i < rows_mainHours0.length; i++) {

      pickDayInsideTableAfter(`02`, '05', 2022);

      // Активация поля ввода
      cy.get('.dx-focused')
        .click();

      // Заполнение данных строки
      fillRow(rows_mainHours0);
    }

    save();

    // ==========

    // Заполнение значений
    const rows_mainHours = [
      [24, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        24, 0, null,
        0, 0, 0, null,
        0, 0, 0, null,
        0]
    ]

    for (let i = 0; i < rows_mainHours.length; i++) {

      cy.get(`[aria-rowindex="2"]`)
        .children()
        .eq(2)
        .click({ force: true });


      // Заполнение данных строки
      fillRow(rows_mainHours);
    }

    save();


    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRows_mainHours = [
      [null,
        { date: '02.05.2022' },
        24, 0, 0,
        0, 0, 24,
        0, 0, 24,
        0, 0, 24,
        0, 0, 24,
        0, 0, 24,
        0, 0, 0, 24,
        0, 0, 0, 24,
        0, 0, 0, 24,
        0, 0, 0, 24,
        24, 0, 0,
        0, 0, 0, 24,
        0, 0, 0, 24,
        0]
    ]

    checkRows(checkRows_mainHours);

  });

  it('1.4 Создание и проверка ряда - Ежедневный мониторинг показателей работы энергоблоков - энергоблок 1', () => {
    loginTest();

    cy.contains('Ежедневные отчёты').click();
    cy.contains('Ежедневный мониторинг показателей работы энергоблоков').click();

    pickMonth(2022, "май");

    // выбор ' энергоблока № 1'
    cy.get('.indicators > p')
      .contains('Показатели работы')
      .next()
      .find('.dx-texteditor-buttons-container')
      .click({ force: true });
    cy.get('.dx-list-item-selected > .dx-item-content')
      .contains(' энергоблока № 1')
      .click({ force: true })

    // =====================================
    //        Создание строки
    // =====================================

    add();

    pickDayInsideTableAfter(`02`, '05', 2022);

    // get col № 1
    cy.get('.dx-row-inserted > td')
      .eq(2)
      .click({ force: true });

    const row_energyBlocks = [0, 24, null, { select: 'Газ' }, 2383, null, 504, 93.7, null, 0, null, 0, 0, 2423, null, null, null, 169, 164, 167, 114, 4.8, null, 4.8, 38.8, 39.2, 42.4, 42.400, null, 201, null, 0.0, 0, 0]

    // Заполнение данных строки
    fillRow(row_energyBlocks);

    save();

    // =====================================
    //      Проверка сохранения строки
    // =====================================

    const checkRow_energyBlocks = [null, { date: '02.05.2022' }, 0, 24, 24, 'Газ', '2 383', '99,3', 504, '93,7', '810,65', 0, 2, 0, 0, '2 423', '55,83', '-2 385', '0,00', 169, 164, 167, '114,0', '4,8', '59,4', '4,8', '38,8', '39,2', '42,4', '42,400', 0, 201, 0, '0,0', 0, 0]

    checkRowByIndex(checkRow_energyBlocks, 1);
  });

  it('2.1 Баланс пара первой линии (энергоблок 1)', () => {
    loginTest();

    cy.contains('Расчёт фактических показателей').click();
    cy.contains('Баланс пара первой линии').click();

    pickDay('02', '05', 2022)

    // Проверка, что дата установилась
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
      .should('have.value', '2 Августа 2022 г.')

    // Проверка, что поле Небаланс не пустое и не равно нулю
    cy.get('.itemCard')
      .contains('Небаланс')
      .next()
      .find('input.dx-texteditor-input')
      .should('not.have.value', '')
      .and('not.have.value', '0');

    // Поле К.1
    cy.get('.itemCard')
      .contains('К.1')
      .next()
      .find('input.dx-texteditor-input')
      .then(($input) => {
        const k1 = $input.attr('aria-valuenow');

        // ==========================================================
        // 6. Ежедневный мониторинг показателей работы энергоблоков
        // ==========================================================

        cy.contains('Ежедневные отчёты').click();
        cy.contains('Ежедневный мониторинг показателей работы энергоблоков').click();

        pickMonth(2022, "май");

        // выбор ' энергоблока № 1'
        cy.get('.indicators > p')
          .contains('Показатели работы')
          .next()
          .find('.dx-texteditor-buttons-container')
          .click({ force: true });
        cy.get('.dx-list-item-selected > .dx-item-content')
          .contains(' энергоблока № 1')
          .click({ force: true })

        refresh();

        // get row
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(0)
          .children()
          // показатель 11
          .eq(6)
          .invoke('text') // Получаем текст из элемента
          .then((text) => {
            // Удаление пробела
            const ktl_1 = text.replace(/\s/g, "");

            // Проверка значения
            expect(ktl_1).to.equal(k1);
          });
      });
  });

  it('2.2 Баланс пара первой линии (турбоагрегат 2)', () => {
    loginTest();

    cy.contains('Расчёт фактических показателей').click();
    cy.contains('Баланс пара первой линии').click();

    pickDay('02', '05', 2022)

    // Проверка, что дата установилась
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
      .should('have.text', '2 Августа 2022')

    // Поле T.2
    cy.get('.itemCard')
      .contains('Т.2:')
      .next()
      .find('input.dx-texteditor-input')
      .then(($input) => {
        const t2 = $input.attr('aria-valuenow');

        // ===========================================
        // 8. Мониторинг показателей турбоагрегатов
        // ===========================================

        cy.contains('Ежедневные отчёты').click();
        cy.contains('Мониторинг показателей турбоагрегатов').click();

        pickMonth(2022, "май");

        // выбор 'турбоагрегата № 2'
        cy.get('.indicators > p')
          .contains('Показатели работы')
          .next()
          .find('.dx-texteditor-buttons-container')
          .click({ force: true });
        cy.get('.dx-scrollview-content > :nth-child(1) > .dx-item-content')
          .contains('турбоагрегата № 2')
          .click({ force: true });

        refresh();

        // get row
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(1)
          .children()
          // показатель 8
          .eq(9)
          .invoke('text') // Получаем текст из элемента
          .then((text) => {
            // Удаление пробела
            const trb_2 = text.replace(/\s/g, "");

            // Проверка значения
            expect(trb_2).to.equal(t2);
          });
      });
  });
});