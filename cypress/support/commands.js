/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getLoginModal", () => {
  cy.visit("/")
  cy.wait(500)
  cy.get("#registerForm")
    .children()
    .find("button[data-auth=login]")
    .should("be.visible")
    .click()
  cy.wait(500)
  cy.get("#loginForm").should("be.visible")
})

Cypress.Commands.add("typeCredentials", ({ email, password }) => {
  cy.get("input#loginEmail").type(email)
  cy.get("input#loginEmail").should("have.value", email)
  cy.get("input#loginPassword").type(password)
  cy.get("input#loginPassword").should("have.value", password)
})

Cypress.Commands.add("loginSubmit", () => {
  cy.get("#loginForm").find("button").last().click()
})

Cypress.Commands.add("login", (credentials) => {
  cy.getLoginModal()
  cy.typeCredentials(credentials)
  cy.loginSubmit()
})

Cypress.Commands.add("checkLocal", () => {
  cy.window().its(`localStorage.token`).should("exist")
})
