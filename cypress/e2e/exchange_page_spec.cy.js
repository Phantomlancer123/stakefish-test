describe('exchange_page_spec.cy.js', () => {
    it('should visit', () => {
        cy.visit('/')
    })
    it('list with the first ten exchanges', () => {
        cy.get('.ant-table-row').should('have.length', 10)
    })
    it('show high-level information (name, country, URL, logo, trust rank, trust score)', () => {
        cy.get('.ant-table-row').find('td').should('have.length', 60)
    })
    it('details button click', () => {
        cy.get('.ant-table-tbody')
            .find('tr')
            .eq(1)
            .find('td')
            .eq(0)
            .find('.name-form')
            .click()
    })
})
