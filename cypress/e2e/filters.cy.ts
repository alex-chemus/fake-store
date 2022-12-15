/// <reference types="cypress" />
// @ts-check

describe('search', () => {
  it('user can set filters', () => {
    cy.visit('/')
    cy.get('#filters-input', { timeout: 3000 }).focus()

    cy.get('#filters-popup').contains('electronics').should('be.visible')
    cy.get('#filters-input').type('je')
    cy.get('#filters-popup').contains('electronics').should('not.exist')

    cy.get('#filters-input').clear()

    cy.get('#filters-popup').contains('electronics').should('be.visible')
    cy.get('#filters-input').type('electronicsssss')
    cy.get('#filters-popup').should('not.exist')
      
    cy.get('#filters-input').clear()

    cy.get('#filters-input').type('ele')
    cy.get('#filters-popup').contains('electronics').click()

    cy.get('#filters').find('[data-test="electronics"]').should('be.visible')
    cy.get('#remove-filter').click()
    cy.get('#filters').find('[data-test="electronics"]').should('not.exist')
  })
})