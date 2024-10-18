import { API_LOGIN } from "../../fixtures/api.mjs"
import {
  invalid_password,
  invalid_user,
  valid_user,
} from "../../fixtures/user.mjs"

describe("Authentication", () => {
  //** ------------------ Test-1 ---------------------
  it("should successfully sign in with valid credentials", () => {
    cy.intercept("POST", API_LOGIN, (req) => {
      // Double check credentials
      expect(req.body).to.include(valid_user)
    }).as("loginRequest")

    // ------
    cy.login(valid_user)
    // ------

    // Check if request was successful
    cy.wait("@loginRequest").its("response.statusCode").should("equal", 200)
  })
  //** ------------------ End ---------------------

  //** ------------------ Test-2 ---------------------
  it("should prevent user from signing in with invalid user/password and show an error", () => {
    const alertTriggered = cy.stub().as("alertTriggered")
    cy.on("window:alert", alertTriggered)

    cy.intercept("POST", API_LOGIN, (req) => {
      // Double check credentials
      expect(req.body).to.include(invalid_password)
    }).as("loginRequest")

    // ------
    cy.login(invalid_password)
    // ------

    // Check if request failed
    cy.wait("@loginRequest").its("response.statusCode").should("not.equal", 200)
    cy.get("@alertTriggered").should(
      "have.been.calledOnceWith",
      "Either your username was not found or your password is incorrect"
    )
  })
  //** ------------------ End ---------------------

  //** ------------------ Test-3 ---------------------
  it("should prevent users from signing in with an invalid email format and show an error", () => {
    cy.login(invalid_user)

    // Check for error message
    cy.get("input#loginEmail").then(($input) => {
      expect($input[0].validationMessage).to.exist
      expect($input[0].validationMessage).to.contain(
        "Please match the requested format."
      )
      expect($input[0].title).to.contain(
        "Only Noroff student or teacher emails are valid."
      )
    })
  })
  //** ------------------ End ---------------------
})
