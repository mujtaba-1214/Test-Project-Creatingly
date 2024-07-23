import { loginPage } from "../../PageObjects";

export default function HomePage_Creatingly() {
  cy.visit(Cypress.env("devUrl"));
  cy.wait(2000);
  // 30 Seconds Load time for creatingly resources
  cy.wait(5000); // uncaughtexecptionHandling in e2e.js
  
  // Handle confirmation dialog
  cy.get('.notiflix-confirm-overlay').then(($overlay) => {
    if ($overlay.is(':visible')) {
      cy.get('#NXConfirmButtonOk').should('be.visible').click();
    } else {
      cy.log('Confirmation dialog is not visible, proceeding to the next step.');
    }
  });

  // Selecting the artboard
  cy.get("#draw-drawing-panel > .drawingPanel-items > div > .drawing-panel-image-icon").click();
  cy.get(":nth-child(1) > .home-card-list-body > .home-card-image-container > .home-card-img").click();
  cy.wait(2000)
  cy.get(".slide-btn > .ng-tns-c161-0").click({force:true})
  cy.get("#element-drawing-panel > .drawingPanel-items > div > .drawing-panel-image-icon").click();
  

   // Accessing the chart element through the sequence of divs
   // Accessing the chart element through the sequence of divs
  // cy.get('#drawing-panel') // Access the drawing panel
  // .find('.element-panel.flavr-container') // Find the element panel
  // .find('.elements-hover-panel') // Find the hover panel
  // .find('#flavour-scroll') // Find the flavour scroll
  // .find('.ng-star-inserted') // Find the class that was missed
  // .find('.element-separation') // Find the element separation
  // // .find('.popup-elements') // Find the popup elements
  // .find('[data-testid="Chart"]') // Ensure the Bar Chart is visible
  // .click({force:true}); // Click on the Bar Chart or perform any other action you need

  // Accessing the chart element through the sequence of divs
  cy.get('#drawing-panel') // Access the drawing panel
    .find('.element-panel.flavr-container') // Find the element panel
    .find('.elements-hover-panel') // Find the hover panel
    .find('#flavour-scroll') // Find the flavour scroll
    .find('.ng-star-inserted') // Find the class that was missed
    .find('.element-separation') // Find the element separation
    .find('[data-testid="Chart"]') // Finally find the Chart
    .then(($chart) => {
      // Check if the chart is covered by another element
      const coords = $chart[0].getBoundingClientRect();
      cy.log(`Chart coordinates: ${coords.x}, ${coords.y}`);

      // Dispatch mouse events for drag and drop if necessary
      $chart[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      $chart[0].dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 10, clientY: coords.y + 10, bubbles: true }));
      $chart[0].dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      // Optionally click on the chart if needed
       cy.wrap($chart).click({force:true}); // Uncomment if you need to click after drag
       cy.get(":nth-child(1) > .element-separation > .popup-elements > .waiting-saved-template").click({force:true});
       // Click on the specific class element
    cy.get('.element-box2.flavr-hovr-icon.ng-star-inserted').eq(1).click({force:true})
    });
}