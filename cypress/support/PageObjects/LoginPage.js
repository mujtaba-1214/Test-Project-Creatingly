class LoginPage {
    Login(email, password) {
      cy.url().then((url) => {
        cy.log(url)
          cy.log(" -- it is not logged");
          this.typeEmail(email);
          this.typePassword(password);
          cy.get("label > span").click();
          cy.get(".waves-effect").click();
      });
    }
  
    verifyLoginPage() {
      cy.url().should("contains", "/login");
    }
  
    typeEmail(email) {
      cy.get("input[id='username']").clear().type(email);
    }
    typePassword(password) {
      cy.get("input[id='password']").clear().type(password);
    }
}
export default new LoginPage();
