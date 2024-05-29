describe("INDUSTRY MEMBER SIGNUP - INDUSTRY INVITE PASSCODE", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/industry-invite");

    })


    it("should go to signup using a real industry passcode", () => {
        const passcode = "7&zK$Y8";
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

        cy.get('.ss-button-container').click();

        cy.get('.ss-apply-overlay__content').should("exist");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(1)').should("contain.text", "PLEASE ENTER A VALUE")
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text", "IN THE FORM");

        closedOverlay();
    })
})


describe("INDUSTRY PASSCODE - SIGNUP", () => {
    beforeEach(() => {
        const passcode = "7&zK$Y8";
        cy.visit("http://localhost:3000/industry-invite");

        cy.get('.ss-form__input').type(passcode);
        cy.get('.ss-button-container').click();
        cy.url().should('include', '/signup');

    })


    it('should not allow a signup with empty form fields', () => {

        cy.get('.ss-button-container').click();
        cy.get('.ss-apply-overlay').should("exist");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(1)').should("contain.text", "PLEASE FILL OUT");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text", "ALL FIELDS IN");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(3)').should("contain.text", "THE FORM BEFORE");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(4)').should("contain.text", "SUBMITTING");

        closedOverlay();
    })

    it('should not allow a signup with passwords not matching', () => {
        enterTestUserInfoAndSubmitBadPassword();

        cy.get('.ss-apply-overlay').should("exist");
        cy.get('.ss-apply-overlay__content > div > :nth-child(1)').should("contain.text", "Error creating user.");
        cy.get('.ss-apply-overlay__content > :nth-child(1) > :nth-child(2)').should("contain.text", "Passwords do not match");

        closedOverlay();
    })

    it('should allow a user to signup with proper information', () => {
        enterTestUserInfoAndSubmitGoodData()

        cy.url().should("include","payment/membership")
    })



})

function closedOverlay() {
    cy.get('.ss-apply-overlay__close-container > img').click();
    cy.get('.ss-apply-overlay')
        .should('not.be.visible')
        .and('have.css', 'display', 'none')
}

function enterTestUserInfoAndSubmitBadPassword(){
    cy.get(':nth-child(1) > .ss-form__input').type("test-user-123");
    cy.get('.ss-form-container > :nth-child(2) > .ss-form__input').type("last-name-123");
    cy.get('.ss-form-container > :nth-child(3) > .ss-form__input').type("123-456-789");
    cy.get('.ss-form-container > :nth-child(4) > .ss-form__input').type("@testuser");
    cy.get('.ss-form-container > :nth-child(5) > .ss-form__input').type("test-username");
    cy.get('.ss-form-container > :nth-child(6) > .ss-form__input').type("test-artist-name");
    cy.get('.ss-form-container > :nth-child(7) > .ss-form__input').type("test@testemail.com");
    cy.get(':nth-child(8) > .ss-input-container__icon > .ss-form__input').type("testpassword1234");
    cy.get(':nth-child(9) > .ss-input-container__icon > .ss-form__input').type("testpassword1234mistake");
    cy.get('.ss-button-container').click();
}

function enterTestUserInfoAndSubmitGoodData(){
    const uniqueUser = generateUniqueValue('test-user');
    const uniqueLastName = generateUniqueValue('last-name');
    const uniquePhone = generateUniqueValue('123-456-789');
    const uniqueSocial = generateUniqueValue('@testuser');
    const uniqueUsername = generateUniqueValue('test-username');
    const uniqueArtistName = generateUniqueValue('test-artist-name');
    const uniqueEmail = generateUniqueValue('test') + '@testemail.com';
    const uniquePassword = generateUniqueValue('testpassword1234');
    const uniquePasswordMistake = generateUniqueValue('testpassword1234mistake');
    
    cy.get(':nth-child(1) > .ss-form__input').type(uniqueUser);
    cy.get('.ss-form-container > :nth-child(2) > .ss-form__input').type(uniqueLastName);
    cy.get('.ss-form-container > :nth-child(3) > .ss-form__input').type(uniquePhone);
    cy.get('.ss-form-container > :nth-child(4) > .ss-form__input').type(uniqueSocial);
    cy.get('.ss-form-container > :nth-child(5) > .ss-form__input').type(uniqueUsername);
    cy.get('.ss-form-container > :nth-child(6) > .ss-form__input').type(uniqueArtistName);
    cy.get('.ss-form-container > :nth-child(7) > .ss-form__input').type(uniqueEmail);
    cy.get(':nth-child(8) > .ss-input-container__icon > .ss-form__input').type(uniquePassword);
    cy.get(':nth-child(9) > .ss-input-container__icon > .ss-form__input').type(uniquePasswordMistake);
    cy.get('.ss-button-container').click();
}

function generateUniqueValue(base) {
    const timestamp = new Date().getTime();
    return `${base}-${timestamp}`;
}