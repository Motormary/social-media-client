import { apiPath } from "../../../src/js/api/constants"
import { API_LOGIN } from "../../fixtures/api.mjs"
import { valid_user } from "../../fixtures/user.mjs"

describe("Logout", () => {
  it("should log user out of account", () => {
    cy.intercept("POST", API_LOGIN).as("login")
    cy.intercept("GET", apiPath + "/**").as("redirect")

    cy.login(valid_user)

    cy.wait("@login").its("response.statusCode").should("eq", 200)
    cy.wait("@redirect")

    cy.window().its(`localStorage.token`).should("exist")
    cy.window().its(`localStorage.profile`).should("exist")

    cy.get("[data-auth=logout]").should("be.visible")
    cy.get("[data-auth=logout]").click()

    cy.window().its(`localStorage.token`).should("not.exist")
    cy.window().its(`localStorage.profile`).should("not.exist")
  })
})
