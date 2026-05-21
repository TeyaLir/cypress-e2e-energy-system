import { loginTest } from '../../../../support/loginTest.js'
import { pickDay, pickMonth } from '../../../../support/pickDate.js'
import { refresh, add, save } from "../../../../support/toolbar"
import { fillRow, checkRow } from '../../../../support/rowHelpers';

let heatOutputBlock1;
let heatOutputBlock2;
let heatOutputExchanger;
let totalHeatOutput;
let fuelConsumption;
let block1Value;
let block2Value;
let block3Value;

describe('Проверка расчётов эффективности энергосистемы', () => {

  it('1. Ввод данных по топливу', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет и расчет общих показателей за месяц').click();

    pickMonth(2022, "окт.");

    // Создание строки
    add();
    pickDay('02', '10', 2022);

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    // Активация поля ввода
    cy.get('.dx-focused')
      .click();

    const row_generalMetrics = [20, 12, 15.5, 650.8, 0.65, 7500, 180.5, null, 195.3]

    // Заполнение данных строки
    fillRow(row_generalMetrics);

    save();

    // ============================
    //  Проверка сохранения строки
    // ============================

    const checkRow_generalMetrics = [{ date: '02.10.2022' }, 20, 12, 15.5, 650.8, 0.65, 7500, 180.5, 210, 195.3, 230, 0, 0, 0, 0, 230, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.02]

    checkRow(checkRow_generalMetrics);
  });

  it('2. Ввод данных о времени работы оборудования', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет времени работы основного оборудования').click();

    pickMonth(2022, "окт.");

    // Создание строки
    add();
    pickDay('02', '10', 2022);

    // Активация поля ввода
    cy.get('.dx-focused')
      .click();

    const row_equipmentHours = [20, 0, null, 20, 0, null, 20, 0, null, 0, 0, null, 0, 0, null, 0, 0, null, 20];

    // Заполнение данных строки
    fillRow(row_equipmentHours);

    save();

    // скролл влево
    cy.get('.dx-scrollable-container').scrollTo('left');


    // ===========================
    // Проверка сохранения строки
    // ===========================

    const checkRow_equipmentHours = [{ date: '02.10.2022' }, 20, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 20, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 20, 0];

    checkRow(checkRow_equipmentHours);


    // ===========================================================================
    // 2) Ежедневный учет показателей работы энергоблоков - энергоблок №1
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    pickMonth(2022, "окт.");

    // Выбор ' энергоблока № 1'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 1')
      .click({ force: true });

    // Создание строки
    add();
    pickDay('02', '10', 2022);

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    // Выбор колонки № 1
    cy.get('.dx-row-inserted > td')
      .eq(1)
      .click({ force: true });

    const row_energyBlock = [0, 20, null, { select: 'Газ' }, 2000, 450, 85.2, 0, 0, 0, null, null, null, null, null, null, null, 2200, 150, 145, null, null, null, 100, 100, null, 4.2, 4.2, null, 35.5, 36.0, 40.0, 40.0, 180.5]

    // Заполнение данных строки
    fillRow(row_energyBlock);

    save();

    // ============================
    //  Проверка сохранения строки
    // ============================

    const checkRow_energyBlock = [{ date: '02.10.2022' }, 0, 20, 20, 'Газ', 2000, 450, 85.2, 0, 0, 0, 2000, 95.0, 450, 90.0, 720.0, 20, 2, 2200, 150, 145, 160.0, 12, 0.5, 100, 100, 100, 4.2, 4.2, 4.2, 35.5, 36.0, 40.0, 40.0, 180.5, 195.3, 195.3, 230, 0, 0, 0, 0, 0, 1400, 58.3, 3, 0, 82.0]

    checkRow(checkRow_energyBlock, 0); // проверяет c первой строки


    // ===========================================================================
    // 3) Ежедневный учет показателей работы энергоблоков - энергоблок №2
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    // Выбор ' энергоблока № 2'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 2')
      .click({ force: true });

    // Создание строки
    add();
    pickDay('02', '10', 2022);

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    // Выбор колонки № 1
    cy.get('.dx-row-inserted > td')
      .eq(1)
      .click({ force: true });

    const row_energyBlock2 = [0, 20, null, { select: 'Газ' }, 2000, 450, 85.2, 0, 0, 0, null, null, null, null, null, null, null, 2200, 150, 145, null, null, null, 100, 100, null, 4.2, 4.2, null, 35.5, 36.0, 40.0, 40.0, 180.5]

    // Заполнение данных строки
    fillRow(row_energyBlock2);

    save();

    // ============================
    //  Проверка сохранения строки
    // ============================

    const checkRow_energyBlock2 = [{ date: '02.10.2022' }, 0, 20, 20, 'Газ', 2000, 450, 85.2, 0, 0, 0, 2000, 95.0, 450, 90.0, 720.0, 20, 2, 2200, 150, 145, 160.0, 12, 0.5, 100, 100, 100, 4.2, 4.2, 4.2, 35.5, 36.0, 40.0, 40.0, 180.5, 195.3, 195.3, 230, 0, 0, 0, 0, 0, 1400, 58.3, 3, 0, 82.0]

    checkRow(checkRow_energyBlock2);

    // ===========================================================================
    // 3) Ежедневный учет показателей работы энергоблоков - энергоблок №3
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    // выбрать ' энергоблока № 3'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 3')
      .click({ force: true });

    // Создание строки
    add();
    pickDay('02', '10', 2022);

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    // Выбор колонки № 1
    cy.get('.dx-row-inserted > td')
      .eq(1)
      .click({ force: true });

    const row_energyBlock3 = [0, 20, null, { select: 'Газ' }, 2000, 450, 85.2, 0, 0, 0, null, null, null, null, null, null, null, 2200, 150, 145, null, null, null, 100, 100, null, 4.2, 4.2, null, 35.5, 36.0, 40.0, 40.0, 180.5]

    // Заполнение данных строки
    fillRow(row_energyBlock3);

    save();

    // ============================
    //  Проверка сохранения строки
    // ============================

    const checkRow_energyBlock3 = [{ date: '02.10.2022' }, 0, 20, 20, 'Газ', 2000, 450, 85.2, 0, 0, 0, 2000, 95.0, 450, 90.0, 720.0, 20, 2, 2200, 150, 145, 160.0, 12, 0.5, 100, 100, 100, 4.2, 4.2, 4.2, 35.5, 36.0, 40.0, 40.0, 180.5, 195.3, 195.3, 230, 0, 0, 0, 0, 0, 1400, 58.3, 3, 0, 82.0]

    checkRow(checkRow_energyBlock3, 2); // проверяет c третьей строки
  });

  it('3. Тепловая выработка - Ежедневный учет показателей работы теплообменников', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы теплообменников').click();

    pickMonth(2022, "окт.");

    // Выбор теплообменника № 1
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains('теплообменник № 1')
      .click({ force: true });


    // Создание строки
    add();
    pickDay('02', '10', 2022);

    cy.get('.info-container')
      .find('.dx-button-content')
      .contains('Вручную')
      .click({ force: true });

    // Выбор колонки № 1
    cy.get('.dx-row-inserted > td')
      .eq(1)
      .click({ force: true });

    const row_heatExchanger = [0, 2, null, { select: 'Газ' }, 60.5, 75.2, null, 3500, null, null, 72, 1.3, 6, null, 0, null, 0, 0]

    // Заполнение данных строки
    fillRow(row_heatExchanger);

    save();

    // ============================
    //  Проверка сохранения строки
    // ============================

    const checkRow_heatExchanger = [{ date: '02.10.2022' }, 0, 2, 2, 'Газ', 60.5, 75.2, 13.5, 3500, 1750, 52, 72, 1.3, 6, 7, 0, 0, 0, 0]

    checkRow(checkRow_heatExchanger, 0); // проверяет c первой строки
  });

  it('4. Эффективность энергосистемы - проверка результатов - №1 Топливо', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Колонка 1 - Топливо
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(1)
      .find('div')
      .then(($col) => {
        const t = $col.text();

        // ===========================================================================
        //  Ежедневный учет и расчет общих показателей за месяц - показатель № 8
        // ===========================================================================

        cy.contains('Ежедневные отчеты').click();
        cy.contains('Ежедневный учет и расчет общих показателей за месяц').click();

        pickMonth(2022, "окт.");

        refresh();

        // получить строку
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(1)
          .children()
          .eq(8)
          .should('have.text', t);
      });
  });

  it('5. Эффективность энергосистемы - проверка результатов - №2 Qбр энергоблоков I очереди', () => {

    loginTest();

    // ===========================================================================
    // 1) энергоблок № 1
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    pickMonth(2022, "окт.");

    // выбрать ' энергоблока № 1'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 1')
      .click({ force: true });

    // получить строку
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(43)
      .find('div')
      .then(($kotel1) => {
        block1Value = $kotel1.text();
        cy.log('энергоблок № 1 = ' + block1Value)
      });

    // ===========================================================================
    // 2) энергоблок № 2
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    pickMonth(2022, "окт.");

    // выбрать ' энергоблока № 2'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 2')
      .click({ force: true });

    // получить строку
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(43)
      .find('div')
      .then(($kotel2) => {
        block2Value = $kotel2.text();
        cy.log('энергоблок № 2 = ' + block2Value)
      });

    // ===========================================================================
    // 3) энергоблок № 3
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Ежедневный учет показателей работы энергоблоков').click();

    pickMonth(2022, "окт.");

    // выбрать ' энергоблока № 3'
    cy.get('input[autocomplete="off"]')
      .first()
      .click({ force: true })
    cy.get('.dx-scrollview-content')
      .find('.dx-list-item-content')
      .contains(' энергоблока № 3')
      .click({ force: true });

    // получить строку
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(43)
      .find('div')
      .then(($kotel3) => {
        block3Value = $kotel3.text();
        cy.log('энергоблок № 3 = ' + block3Value)
      });


    // ===========================================================================
    // 4) Эффективность энергосистемы
    // ===========================================================================

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Колонка 2 - Qбр энергоблоков I очереди
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(2)
      .find('div')
      .then(($col) => {
        const q1 = $col.text();

        const sumKot = +block1Value + +block2Value + +block3Value;

        cy.log('Cумма энергоблоков = ' + sumKot)
        cy.log('Значение в ячейке № 2 - Qбр энергоблоков I очереди = ' + q1)

        if (q1 == sumKot) {
          cy.log('Сумма энергоблоков равна значению в ячейке')
        } else {
          cy.log(reportError('Сумма энергоблоков не равна значению в ячейке'))
        }
      });
  });

  it('6. Эффективность энергосистемы - проверка результатов - №3 Qбр энергоблоков II очереди', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Колонка 3 - Qбр энергоблоков II очереди
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(3)
      .find('div')
      .should('have.text', '0');
  });

  it('7. Эффективность энергосистемы - проверка результатов - №4 Qбр теплообменник', () => {
    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Колонка 4 - Qбр теплообменник
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(4)
      .find('div')
      .then(($col) => {
        const qHeatExchanger = $col.text();

        // ===========================================================================
        // Ежедневный учет показателей работы теплообменников - показатель № 10
        // ===========================================================================

        cy.contains('Ежедневные отчеты').click();
        cy.contains('Ежедневный учет показателей работы теплообменников').click();

        pickMonth(2022, "окт.");

        // выбрать теплообменник № 1
        cy.get('input[autocomplete="off"]')
          .first()
          .click({ force: true })
        cy.get('.dx-scrollview-content')
          .find('.dx-list-item-content')
          .contains('теплообменник № 1')
          .click({ force: true });

        refresh();

        // получить строку
        cy.get('.dx-row')
          .filter('.dx-data-row')
          .eq(0)
          .children()
          .eq(10)
          .should('have.text', qHeatExchanger);
      });
  });

  it('8. Эффективность энергосистемы - проверка результатов - №5 Qбр ТЭЦ Гкал', () => {

    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Qбр энергоблоков I очереди
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(2)
      .find('div')
      .then(($q1) => {
        heatOutputBlock1 = $q1.text();
        cy.log('Qбр энергоблоков I очереди = ' + heatOutputBlock1)
      });

    // Qбр энергоблоков II очереди
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(3)
      .find('div')
      .then(($q2) => {
        heatOutputBlock2 = $q2.text();
        cy.log('Qбр энергоблоков II очереди = ' + heatOutputBlock2)
      });

    // Qбр теплообменник
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(4)
      .find('div')
      .then(($qHeatExchanger) => {
        heatOutputExchanger = $qHeatExchanger.text();
        cy.log('Qбр теплообменник = ' + heatOutputExchanger)
      });

    // Колонка 5 - Qбр ТЭЦ
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(5)
      .find('div')
      .then(($col) => {
        const qGeneralMetrics = $col.text();

        // Подтверждение, что данные получены
        cy.log('heatOutputBlock1 = ' + heatOutputBlock1)
        cy.log('heatOutputBlock2 = ' + heatOutputBlock2)
        cy.log('heatOutputExchanger = ' + heatOutputExchanger)

        // Преобразование строк в числа и сложение
        const sum = +heatOutputBlock1 + +heatOutputBlock2 + +heatOutputExchanger;

        cy.log('Cумма = ' + sum)
        cy.log('Значение в ячейке 5. Qбр ТЭЦ Гкал = ' + qGeneralMetrics)

        if (qGeneralMetrics == sum) {
          cy.log('Сумма равна')
        } else {
          cy.log(reportError('Сумма не равна'))
        }
      });
  });

  it('9. Эффективность энергосистемы - проверка результатов - №6 КПД брутто', () => {
    loginTest();

    cy.contains('Ежедневные отчеты').click();
    cy.contains('Эффективность энергосистемы').click();

    pickMonth(2022, "окт.");

    // Qбр ТЭЦ
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(5)
      .find('div')
      .then(($totalHeatOutput) => {
        totalHeatOutput = $totalHeatOutput.text();
        cy.log('Qбр ТЭЦ = ' + totalHeatOutput)
      });

    // Топливо
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(1)
      .find('div')
      .then(($t2) => {
        fuelConsumption = $t2.text();
        cy.log('Топливо ' + fuelConsumption)
      });

    // Колонка №6 - КПД брутто
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(6)
      .find('div')
      .children()
      .then(($kpdBr) => {
        const kpd = $kpdBr.text();

        // Подтверждение, что данные получены
        cy.log('Qбр ТЭЦ = ' + totalHeatOutput)
        cy.log('Топливо = ' + fuelConsumption)

        // Преобразование строк в числа, вычисление КПД брутто, округление значения до двух знаков после запятой
        const value = ((+totalHeatOutput / (7 * +fuelConsumption)) * 100).toFixed(2);

        cy.log('Вычисленное значение = ' + value)
        cy.log('Значение в ячейке №6 КПД брутто = ' + kpd)

        if (kpd == value) {
          cy.log('Значение верно')
        } else {
          cy.log(reportError('Значение КПД брутто не верно'))
        }
      });
  });
});