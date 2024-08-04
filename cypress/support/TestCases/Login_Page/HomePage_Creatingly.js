export default function HomePage_Creatingly(elementIndex) {
  cy.visit(Cypress.env("devUrl"));
  cy.wait(2000);
  // 30 Seconds Load time for creatingly resources
  cy.wait(5000); // uncaughtexceptionHandling in e2e.js

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
  cy.wait(2000);
  cy.get("#element-drawing-panel > .drawingPanel-items > div > .drawing-panel-image-icon").click();

  // Find all elements with the data-testid attribute
  cy.get('[data-testid]').then(($elements) => {
    // Log the number of elements found and their types
    cy.log(`Number of elements found: ${$elements.length}`);
    $elements.each((index, element) => {
      cy.log(`Element ${index + 1}: ${element.getAttribute('data-testid')}`);
    });

    // Ensure the index is within the range of elements available
    if ($elements.length > elementIndex - 1) {
      // Get the element based on the configurable index
      const selectedElement = $elements[elementIndex - 1]; // Convert to zero-based index
      cy.log(`Interacting with element type: ${selectedElement.getAttribute('data-testid')}`);
      
      // Dispatch mouse events for drag and drop if necessary
      const coords = selectedElement.getBoundingClientRect();
      cy.wrap(selectedElement).trigger('mousedown', { bubbles: true, force: true });
      cy.wrap(selectedElement).trigger('mousemove', { clientX: coords.x + 10, clientY: coords.y + 10, bubbles: true, force: true });
      cy.wrap(selectedElement).trigger('mouseup', { bubbles: true, force: true });

      // Optionally click on the element if needed
      cy.wrap(selectedElement).click({ force: true }); // Uncomment if you need to click after drag
      cy.get(":nth-child(1) > .element-separation > .popup-elements > .waiting-saved-template").click({ force: true });
      // Click on the specific class element
      cy.get('.element-box2.flavr-hovr-icon.ng-star-inserted').eq(1).click({ force: true });
      cy.wait(2000);
      cy.get(".grid-align-container > :nth-child(5)").click();
      cy.contains("Stretch Vertically").click({ force: true });
      cy.wait(2000);
      cy.contains("Stretch Horizontally").click({ force: true });
      cy.wait(5000);
    } else {
      cy.log('Configured index exceeds the number of available elements.');
    }
  });
}
