describe('Spinner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=atoms-spinner--default'));

  it('should render the component', () => {
    cy.get('uikit-common-spinner').should('exist');
  });
});
