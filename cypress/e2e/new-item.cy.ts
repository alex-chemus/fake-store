/// <reference types="cypress" />
// @ts-check

describe('new item', () => {
  it('user can open/close editor modal', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    cy.get('#editor-modal').should('be.visible')
    cy.get('#close-editor-modal').click()
    cy.get('#editor-modal').should('not.be.visible')
  })

  it('user can add new item', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    const modal = cy.get('#editor-modal')
    modal.find('input[name="title"]').type('title')
    modal.find('input[name="price"]').type('13.5')
    modal.find('textarea[name="description"]')
      .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    modal.find('input[name="image"]').type('https://test-test.com/image.jps')
    modal.find('fieldset').find('input[type="radio"]').filter(':first-child').click()
    modal.find('#add-button').click()

    cy.get('#editor-modal').should('not.be.visible')
  })

  it('check field price', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    const field = cy.get('#editor-modal').find('input[name="price"]')

    field.type('13.5')
    field.blur()
    field.contains('13.50')
    field.clear()

    field.type('13')
    field.blur()
    field.contains('13.00')
    field.clear()

    field.type('some text')
    field.blur()
    field.contains('0.00')
    field.clear()

    field.type('10.')
    field.blur()
    field.contains('10.00')
    field.clear()

    field.type('.10')
    field.blur()
    field.contains('0.10')
    field.clear()

    field.type('10.109')
    field.blur()
    field.contains('11.09')
    field.clear()
  })
})