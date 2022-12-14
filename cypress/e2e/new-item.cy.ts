/// <reference types="cypress" />
// @ts-check

describe('new item', () => {
  it('user can open/close editor modal', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    cy.get('#editor-modal').should('be.visible')
    cy.get('#close-editor-modal').click()
    cy.get('#editor-modal').should('not.exist')
  })

  it('user can add new item', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    //const modal = cy.get('#editor-modal')
    cy.get('#editor-modal').find('input[name="title"]').type('title')
    cy.get('#editor-modal').find('input[name="price"]').type('13.5')
    cy.get('#editor-modal').find('textarea[name="description"]')
      .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    cy.get('#editor-modal').find('input[name="image"]').type('https://test-test.com/image.jps')
    cy.get('#editor-modal').find('fieldset').find('[data-test="radio"]').filter(':first-child').click()
    cy.get('#editor-modal').find('#add-button').click()

    cy.get('#editor-modal').should('not.exist')
  })

  it('check field price', () => {
    cy.visit('/')
    cy.get('#new-button').click()

    const field = cy.get('#editor-modal').find('input[name="price"]')

    field.type('13.5')
    field.blur()
    //field.contains('13.50')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '13.50')
    field.clear()

    field.type('13')
    field.blur()
    //field.contains('13.00')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '13.00')
    field.clear()

    field.type('some text')
    field.blur()
    //field.contains('0.00')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '0.00')
    field.clear()

    field.type('10.')
    field.blur()
    //field.contains('10.00')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '10.00')
    field.clear()

    field.type('.10')
    field.blur()
    //field.contains('0.10')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '0.10')
    field.clear()

    field.type('10.109')
    field.blur()
    //field.contains('11.09')
    cy.get('#editor-modal').find('input[name="price"]')//.should('have.text', '13.50')
      .invoke('val')
      .should('eq', '10.10')
    field.clear()
  })
})