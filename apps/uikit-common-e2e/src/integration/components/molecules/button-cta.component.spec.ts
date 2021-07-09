describe('Button CTA component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=molecules-button-cta--default'));

  it('should render the component', () => {
    cy.get('uikit-common-button-cta').should('exist');
  });
});
