describe('Register Tests', () => {



    it.only('Updating Register', () => {
      cy.visit('http://localhost:3001/')
  
      //create account
      cy.get('#createAcc > #logLink').click();
      cy.get('#username').type('AUTOREGUSER');
      cy.get('#password').type('pass123');
      cy.get('#email').type('test');
      cy.get('#telephone').type('03245 521341');
      cy.get('#submitBtn').click();
  
      //checks account created successfully
      cy.get('#responseMessageSuccess').should('have.text','User created successfully');
  
      //log in
      cy.get('#logLink').click();
      cy.get('#username').type('AUTOREGUSER');
      cy.get('#password').type('pass123');
      cy.get(':nth-child(2) > a > #logLink').click();
  
      //navigate to search student page and select created user
      cy.get('#searchRegisterNav > .nav-link').click();
      cy.get('.list-group-item').click();
      cy.wait(2000);
      cy.contains('2022').click();
      cy.get(':nth-child(1) > a > .btn').click();
  
        //update register details
        cy.get('#studentIDField').type('SU123');
        cy.get('#attendanceStatusField').type('false');
        cy.get('#classIDfield').type('CL123');
        cy.get('#editButton').click();
        cy.wait(2000)

        cy.get('#studentIDField').type('SU123');
        cy.get('#attendanceStatusField').type('true');
        cy.get('#classIDfield').type('CL123');
        cy.get('#editButton').click();
        cy.wait(2000);

        //navigate to search student page
        cy.get('#searchStudent > .nav-link').click();
        cy.contains('AUTOREGUSER').click();

        //delete created user
        cy.get(':nth-child(1) > a > .btn').click();
        cy.get('#deleteBtn').click();



  
  
    })
  })