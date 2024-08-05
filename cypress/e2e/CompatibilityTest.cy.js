import CompatibilityTest from "../support/TestCases/CompatibilityTest";

describe("Compatibility Test Case", () => {
  const viewports = [
    { width: 1920, height: 1080 }, // Desktop
    { width: 1366, height: 768 },  // Laptop
    { width: 768, height: 1024 },  // Tablet Portrait
    { width: 1024, height: 768 },  // Tablet Landscape
    { width: 375, height: 667 }    // Mobile Portrait
  ];

  viewports.forEach((viewport) => {
    it(`Verifies compatibility of interacting with the element at ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      CompatibilityTest(5); // Adjust the index as needed
    });
  });
});
