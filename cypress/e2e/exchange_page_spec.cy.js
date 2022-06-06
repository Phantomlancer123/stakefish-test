describe('exchange_page_spec.cy.js', () => {
    it('should visit', () => {
        cy.visit('/')
    })
    it('list with the first ten exchanges', () => {
        cy.get('.ant-table-row').should('have.length', 10)
    })
})
