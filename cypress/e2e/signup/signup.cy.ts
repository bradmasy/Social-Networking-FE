describe("INDUSTRY MEMBER SIGNUP - INDUSTRY INVITE PASSCODE", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/industry-invite");

    })


    it("should go to signup using a real industry passcode", () => {
        const passcode = "7&zK$Y8";
        cy.visit("http://localhost:3000/industry-invite");

        cy.get('.ss-form__input').type(passcode);
        cy.get('.ss-button-container').click();

        cy.url().should('include', '/signup');
    })


    it("should fail with a bad industry code", () => {
        const passcode = "badcode";

        cy.get('.ss-form__input').type(passcode);
        cy.get('.ss-button-container').click();

        cy.get('.ss-apply-overlay__content').should("exist");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(1)').should("contain.text", "ERROR")
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text", "INVALID PASSCODE");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(3)').should("contain.text", "ENSURE THE CODE IS CORRECT");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(4)').should("contain.text", "AND TRY AGAIN");

        cy.get('.ss-apply-overlay__close-container > img').click();

    })

    it("should fail with no code", () => {
        cy.visit("http://localhost:3000/industry-invite");

        cy.get('.ss-button-container').click();

        cy.get('.ss-apply-overlay__content').should("exist");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(1)').should("contain.text", "PLEASE ENTER A VALUE")
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text", "IN THE FORM");

        cy.get('.ss-apply-overlay__close-container > img').click();

    })
})


describe("INDUSTRY PASSCODE - SIGNUP", ()=>{
    
})