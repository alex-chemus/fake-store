/// <reference types="cypress" />
// @ts-check

describe('main page', () => {
  it('user can click item card', () => {
    cy.visit('/')
    cy.get('article', { timeout: 3000 })
      .filter(':first-child')
      .click()

    cy.get('#card-modal').should('be.visible')

    cy.get('#card-modal').find('#close-card-modal').click()

    cy.on('window:alert', str => {
      cy.get('#card-modal').should('not.be.visible')
    })

    //cy.get('#card-modal').should('not.be.visible')
  })
})