describe('Card component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cardcomponent--primary'));

  it('should render the component', () => {
    cy.get('uikit-common-card').should('exist');
  });
});
