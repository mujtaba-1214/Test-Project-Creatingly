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


Cypress.Commands.add('dragTo', { prevSubject: true }, (subject, target, opts = {}) => {
    opts = Cypress._.defaults(opts, {
      delay: 0,
      steps: 0,
      smooth: false,
    });
  
    cy.wrap(subject).should('exist').and('be.visible');
  
    const startCoords = getCoords(subject);
    const endCoords = getCoords(cy.get(target));
  
    // Dispatch mousedown
    subject[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  
    // Move to the start position
    subject[0].dispatchEvent(new MouseEvent('mousemove', { clientX: startCoords.x, clientY: startCoords.y, bubbles: true }));
  
    // Move to the target position
    if (opts.smooth) {
      for (let i = 0; i < opts.steps; i++) {
        const x = startCoords.x + (endCoords.x - startCoords.x) * (i / opts.steps);
        const y = startCoords.y + (endCoords.y - startCoords.y) * (i / opts.steps);
        subject[0].dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true }));
        cy.wait(opts.delay);
      }
    }
  
    // Dispatch mouseup
    subject[0].dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });

  Cypress.Commands.add('hover', { prevSubject: true }, (subject) => {
    const coords = subject[0].getBoundingClientRect();
    
    // Dispatch mouseover event
    subject[0].dispatchEvent(new MouseEvent('mouseover', {
      bubbles: true,
      clientX: coords.x + (coords.width / 2),
      clientY: coords.y + (coords.height / 2),
    }));
  
    // Dispatch mouseenter event
    subject[0].dispatchEvent(new MouseEvent('mouseenter', {
      bubbles: true,
      clientX: coords.x + (coords.width / 2),
      clientY: coords.y + (coords.height / 2),
    }));
  });