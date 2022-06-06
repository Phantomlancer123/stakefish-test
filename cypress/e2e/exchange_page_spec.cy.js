Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
        return false
    }
})

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
    it('show details on a separate page (name, country, trust rank, logo, year of establishment, social media links, description)', () => {
        cy.get('.exchange-detail__layer > div').should('have.length', 7)
    })
    it('go back to homepage', () => {
        cy.get('.exchange-detail__action > button').click()
    })
})
