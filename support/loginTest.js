import { BASE_URLS, TEST_USERS } from './testData';

export function loginTest(userType = 'STANDARD') {
  const user = TEST_USERS[userType] || TEST_USERS.STANDARD;

  cy.visit(BASE_URLS.APP);

  cy.get('[name="login"]')
    .should('be.visible')
    .type(user.login);
  cy.get('[name="login"]')
    .should('have.value', user.login);

  cy.get('[name="password"]')
    .type(user.password);
  cy.get('[name="password"]')
    .should('have.value', user.password);

  cy.get('.dx-button-submit-input')
    .click();
}