export class Login{
    getUsernameField = () => cy.get('#username');

    typeInUserField(){
        this.getUsernameField().type('bruhh');
    }
}