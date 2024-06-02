describe("LOGIN - TEST", () => {
    beforeEach(() => {
        const user = {
            username:"admin-brad",
            password:"Admin1234!"
        }
        cy.visit('http://localhost:3000/');


    })

    it("should log in with valid credentials", () => {
        cy.get('.ss-home-container__buttons > :nth-child(2)').click();
        cy.get(':nth-child(1) > .ss-form__input').type('admin-brad')
        cy.get('.ss-input-container__icon > .ss-form__input').type("Peppers@134")
        cy.get('.ss-button-container').click();

        cy.url('http://localhost:3000/user-dashboard')
    
    })

    it("should not login with bad credentials", () => {
        cy.get('.ss-home-container__buttons > :nth-child(2)').click();
        cy.get(':nth-child(1) > .ss-form__input').type('admin-brad')
        cy.get('.ss-input-container__icon > .ss-form__input').type("badpassword")

        cy.get('.ss-button-container').click();
        cy.get('.ss-apply-overlay').should("be.visible");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(1)').should("contain.text","INVALID CREDENTIALS");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text","PLEASE TRY AGAIN")

    })
})