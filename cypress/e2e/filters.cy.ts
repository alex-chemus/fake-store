describe('search', () => {
  it('user can set filters', () => {
    cy.visit('/')
    cy.get('#filters-input').focus()

    cy.get('#filters-popup').find('electronics').should('be.visible')
    cy.get('#filters-input').type('electronicsss')
    cy.get('#filters-popup').contains('electronics').should('be.not.visible')

    cy.get('#filters-input').clear()

    cy.get('#filters-input').type('ele')
    cy.get('#filters-popup').contains('electronics').click()

    cy.get('#filters').find('[data-test="electronics"]').should('be.visible')
    cy.get('#filters').find('[data-test="electronics"]').click()
    cy.get('#filters').find('[data-test="electronics"]').should('be.not.visible')
  })
})