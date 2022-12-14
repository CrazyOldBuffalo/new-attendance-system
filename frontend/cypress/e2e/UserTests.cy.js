describe('User Tests', () => {



  it.only('UpdatingUser', () => {
    cy.visit('http://localhost:3001/')

    //create account
    cy.get('#createAcc > #logLink').click();
    cy.get('#username').type('AUTOUSER');
    cy.get('#password').type('pass123');
    cy.get('#email').type('test');
    cy.get('#telephone').type('03245 521341');
    cy.get('#submitBtn').click();

    //checks account created successfully
    cy.get('#responseMessageSuccess').should('have.text','User created successfully');

    //log in
    cy.get('#logLink').click();
    cy.get('#username').type('AUTOUSER');
    cy.get('#password').type('pass123');
    cy.get(':nth-child(2) > a > #logLink').click();

    //navigate to search student page and select created user
    cy.get('#searchStudent > .nav-link').click();
    cy.wait(2000);
    cy.contains('AUTOUSER').click();
    cy.get(':nth-child(1) > a > .btn').click();

      //update user details
     cy.get('#email').type('updatedemail@gm.com');
     cy.get('#updateBtn').click();

     //navigate to search student page
     cy.get('#searchStudent > .nav-link').click();
     cy.contains('AUTOUSER').click();
     cy.get('#emailField').should('contain','updatedemail@gm.com');

     //delete created user
     cy.get(':nth-child(1) > a > .btn').click();
     cy.get('#deleteBtn').click();



  })
})