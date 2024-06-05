/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// ############################################################################################
// AVANT DE RENTRER UNE NOUVELLE COMMANDE => IL FAUT EN DECLARER SON INTERFACE DANS global.d.ts
// ############################################################################################

Cypress.Commands.add('login', (username, password) => {
      // Je visite la homepage
      cy.visit('http://localhost:4200/allCategories');
      // Je clique sur mon lien de connexion dans le header
      cy.get('[data-test-id="connexion"]').click();
      // J'attends que la modale s'affiche
      cy.get('[data-test-id="modale_connexion"]') // Sélecteur de la modale de connexion
      .should('have.css', 'display', 'block');
      // Je dois insérer mes credentials dans les inputs du form
      cy.get('[data-test-id="modale_connexion"] form')
      // Permet de ne cibler que les descendants de ce form (si plsr form dans la page)
      cy.get('[data-test-id="modale_connexion"] form').within(() => {
        // .type(username) => Cypress tape litérallement la valeur donnée au param username
        cy.get('input[formControlName="username"]').type(username); 
         // .type(password) => Cypress tape litérallement la valeur donnée au param password
        cy.get('input[formControlName="password"]').type(password); 
      });
      // Je soumets le formulaire en sélectionnant et activant le btn
      cy.get('[data-test-id="modale_connexion"] form button[type="submit"]').click();
      // Attendre apparition du changement de menu pour confirmer la connexion  
      cy.get('[data-test-id="logout"]');
});

Cypress.Commands.add('newPdf', (smallDescription, description, pdfFile, cat1, cat2, cat3, cat4) => {
  cy.get('[data-test-id="modalePdf"] form').within(() => {
    cy.get('input[formControlName="smallDescription"]').type(smallDescription); 
    cy.get('textarea[formControlName="description"]').type(description); 
    cy.get('input[formControlName="pdfFile"]').selectFile('cypress/fixtures/example.json');

    cy.get('#categories').select('Technologies',{force: true});
    cy.get('#categories').contains('Technologies');
    // cy.get('select[formControlName="childCategories"]').select(cat2);
    // cy.get('select[formControlName="subChildCategories"]').select(cat3);
    // cy.get('select[formControlName="finalCategory"]').select(cat4);


  });
  // cy.get('[data-test-id="pdfSubmit"]').click();
});


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }