describe("APPLICATION", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/apply");
    })


    it("should submit an application with proper data",() => {
        fillInApplicationForm();
        checkSuccessMessage();
    })

    it("should throw an error when not all the fields are present", () => {
        fillInApplicationFormBadData();
        checkErrorMessage();
    })



})

function fillInApplicationForm(){
    cy.get(':nth-child(1) > .ss-form__input').type('test-user');
    cy.get(':nth-child(2) > .ss-form__input').type('test-artist-name');
    cy.get(':nth-child(3) > .ss-form__input').type('@test');
    cy.get(':nth-child(4) > .ss-form__input').type('test@test-email.com');
    cy.get(':nth-child(5) > .ss-form__input').type('1990-04-02');
    cy.get(':nth-child(6) > .ss-form__input').select(1);
    cy.get(':nth-child(7) > .ss-form__input').type('test')
    cy.get(':nth-child(8) > .ss-form__input').type('test')
    cy.get(':nth-child(9) > .ss-form__input').type('test')
    cy.get(':nth-child(10) > .ss-form__input').type('test')
    cy.get(':nth-child(11) > .ss-form__input').type('test')
    cy.get(':nth-child(12) > .ss-form__input').type('test')
    cy.get(':nth-child(13) > .ss-form__input').type('test')
    cy.get('.ss-button-container').click();
}

function fillInApplicationFormBadData(){
    cy.get(':nth-child(1) > .ss-form__input').type('test-user');
    cy.get(':nth-child(2) > .ss-form__input').type('test-artist-name');
    cy.get(':nth-child(3) > .ss-form__input').type('@test');
    cy.get(':nth-child(4) > .ss-form__input').type('test@test-email.com');
    cy.get(':nth-child(5) > .ss-form__input').type('1990-04-02');
    cy.get(':nth-child(6) > .ss-form__input').select(1);
    cy.get(':nth-child(7) > .ss-form__input').type('test')
    cy.get(':nth-child(8) > .ss-form__input').type('test')
    cy.get(':nth-child(9) > .ss-form__input').type('test')
    cy.get(':nth-child(10) > .ss-form__input').type('test')
    cy.get(':nth-child(11) > .ss-form__input').type('test')
    cy.get(':nth-child(12) > .ss-form__input').type('test')
    // cy.get(':nth-child(13) > .ss-form__input').type('test')
    cy.get('.ss-button-container').click();
}

function checkSuccessMessage(){
    cy.get('.ss-apply-overlay__content > div > :nth-child(1)').should("contain.text","THANK YOU FOR YOUR APPLICATION");
    cy.get('.ss-apply-overlay__content > div > :nth-child(2)').should("contain.text","SEVENS SOCIAL WILL");
    cy.get('.ss-apply-overlay__content > div > :nth-child(3)').should("contain.text","CAREFULLY REVIEW IT");
    cy.get('.ss-apply-overlay__content > div > :nth-child(4)').should("contain.text","AND REACH OUT TO YOU SOON");
}

function checkErrorMessage(){
    cy.get('.ss-apply-overlay__content > div > :nth-child(1)').should("contain.text","THANK YOU FOR YOUR APPLICATION");
    cy.get('.ss-apply-overlay__content > div > :nth-child(1)').should("contain.text","SUBMITTING YOUR APPLICATION");
    cy.get('.ss-apply-overlay__content > div > :nth-child(2)').should("contain.text","PLEASE TRY AGAIN LATER.");

}