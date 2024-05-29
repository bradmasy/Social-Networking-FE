

describe("USER DASHBOARD - TEST", () => {
    beforeEach(() => {
        const user = {
            username: "admin-brad",
            password: "Admin1234!"
        }

        cy.login('admin-brad', 'Peppers@134');


    })

    it("user dashboard should display the correct data", () => {
        cy.get(':nth-child(1) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "1");
        cy.get(':nth-child(2) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "admin-brad");
        cy.get(':nth-child(3) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "bradmasy@gmail.com");
        cy.get(':nth-child(4) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "brad");
        cy.get(':nth-child(5) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "bmas");
        cy.get(':nth-child(6) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "masciotra");
        cy.get(':nth-child(7) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "778-222-5204");
        cy.get(':nth-child(8) > .ss-user-dashboard__info-snippets__info-snippet').should("contain.text", "@bradmasy");


    })

    it("should display the tab menu when clicked", () => {
        cy.get('.ss-user-dashboard-menu-options > :nth-child(2)').click();
        cy.get('.ss-user-dashboard__tab__container__column > :nth-child(1)').should("exist");
        cy.get('.ss-user-dashboard__tab__container__column > :nth-child(2)').should("exist");
        cy.get('.ss-user-dashboard__tab__container__column-payment-form').should("exist");

        // check the tab stats
        cy.get('.ss-user-dashboard__tab__container__column__tile__content').should("contain.text","$264")
        cy.get('.ss-user-dashboard__receipt-tab').should("exist");

        // check the payment form
        cy.get('.ss-payment-form-container').should("exist");
    })

    // test a payment to the tab
})