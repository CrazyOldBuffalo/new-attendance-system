describe('Academic Advisor Tests', () => {



    it.only('Generate Report', () => {
      cy.visit('http://localhost:3001/')
  
      //create account
      cy.get('#createAcc > #logLink').click();
      cy.get('#username').type('AUTOADDUSER');
      cy.get('#password').type('pass123');
      cy.get('#email').type('test');
      cy.get('#telephone').type('03245 521341');
      cy.get('#submitBtn').click();
  
      //checks account created successfully
      cy.get('#responseMessageSuccess').should('have.text','User created successfully');
  
      //log in
      cy.get('#logLink').click();
      cy.get('#username').type('AUTOADDUSER');
      cy.get('#password').type('pass123');
      cy.get(':nth-child(2) > a > #logLink').click();

      //navigate to academic advisor page 
      cy.get(':nth-child(5) > .nav-link').click();
      cy.get('.list-group-item').click();
      cy.get('.badge').click();
      cy.get('#studentID').type('SU125');
      cy.get('form > .badge').click();

      cy.get('p').should('contain','Overall Attendance');
  





        //navigate to search student page
        cy.get('#searchStudent > .nav-link').click();
        cy.contains('AUTOADDUSER').click();

        //delete created user
        cy.get(':nth-child(1) > a > .btn').click();
        cy.get('#deleteBtn').click();



  
  
    })
  })