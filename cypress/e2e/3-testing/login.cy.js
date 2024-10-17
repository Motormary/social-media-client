describe("Authentication", () => {
  const api = "https://nf-api.onrender.com/api/v1/social/auth/login"

  //** ------------- Repeat Offenders ------------ */
  const getLoginModal = () => {
    cy.visit("/")
    cy.wait(500)
    cy.get("#registerForm")
      .children()
      .find("button[data-auth=login]")
      .should("be.visible")
      .click()
    cy.wait(500)
    cy.get("#loginForm").should("be.visible")
  }

  const fillLoginForm = (email, password) => {
    // Type and check credentials
    cy.get("input#loginEmail").type(email).should("have.value", email)
    cy.get("input#loginPassword").type(password).should("have.value", password)
  }

  const submitLoginForm = () => {
    // Submit form like a !!Bot
    cy.get("#loginForm").find("button").last().click()
  }
  //** ------------------ End --------------------- */

  //** ------------------ Test-1 --------------------- */
  it("should successfully sign in with valid credentials", () => {
    const user = {
      email: "matmoen00100@stud.noroff.no",
      password: "qweqweqwe",
    }

    cy.intercept("POST", api, (req) => {
      // Double check credentials
      expect(req.body).to.include(user)
      req.reply((res) => {
        // Expect auth to succeed
        expect(res.statusCode).to.equal(200)
      })
    }).as("loginRequest")

    // ------
    getLoginModal()
    fillLoginForm(user.email, user.password)
    submitLoginForm()
    // ------

    cy.wait("@loginRequest")
  })
  //** ------------------ End --------------------- */

  //** ------------------ Test-2 --------------------- */
  it("should prevent user from signing in with invalid credentials and show an error", () => {
    const user = {
      email: "matmoen00100@stud.noroff.no",
      password: "Password123",
    }

    const alertTriggered = cy.stub().as("alertTriggered")
    cy.on("window:alert", alertTriggered)

    cy.intercept("POST", api, (req) => {
      // Double check credentials
      expect(req.body).to.include(user)
      req.reply((res) => {
        // Expect auth to fail
        expect(res.statusCode).to.not.equal(200)
      })
    }).as("loginRequest")

    // ------
    getLoginModal()
    fillLoginForm(user.email, user.password)
    submitLoginForm()
    // ------

    cy.wait("@loginRequest")
    cy.get("@alertTriggered").should(
      "have.been.calledOnceWith",
      "Either your username was not found or your password is incorrect"
    )
  })
  //** ------------------ End --------------------- */

  //** ------------------ Test-3 --------------------- */
  it("should prevent users from signing in with an invalid email format and show an error", () => {
    const user = {
      email: "matmoen00100@stud.norof.no",
      password: "qweqweqwe",
    }

    // ------
    getLoginModal()
    fillLoginForm(user.email, user.password)
    submitLoginForm()
    // ------

    // Check error
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
  //** ------------------ End --------------------- */
})
