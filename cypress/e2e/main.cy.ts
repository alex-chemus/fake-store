/// <reference types="cypress" />
// @ts-check

describe('main page', () => {
  it('user can click item card', () => {
    cy.visit('/')
    cy.get('article').click()

    cy.get('#card-modal').should('be.visible')

    cy.get('#card-modal').find('#close-card-modal').click()

    cy.get('#card-modal').should('not.be.visible')
  })
})