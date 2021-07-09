describe('Card component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=atoms-card--default'));

  it('should render the component', () => {
    cy.get('uikit-common-card').should('exist');
  });
});
