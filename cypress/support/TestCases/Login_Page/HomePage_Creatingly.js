import { loginPage } from "../../PageObjects";

export default function HomePage_Creatingly() {
  cy.visit(Cypress.env("devUrl"));
  cy.wait(2000);
  //30 Seconds Load time for creatingly resources
  cy.wait(5000); //uncaughtexecptionHandling in e2e
  //cy.get("#NXConfirmButtonOk").click();
  cy.get("#draw-drawing-panel > .drawingPanel-items > div > .drawing-panel-image-icon").click();
  cy.get(":nth-child(1) > .home-card-list-body > .home-card-image-container > .home-card-img").click();
}
