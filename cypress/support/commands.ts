import 'cypress-file-upload';
/// <reference types="cypress" />

// ############################################################################################
// AVANT DE RENTRER UNE NOUVELLE COMMANDE => IL FAUT EN DECLARER SON INTERFACE DANS global.d.ts
// ############################################################################################

// Méthode pour le signin
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
      // Je soumets le formulaire en sélectionnant et en activant le btn
      cy.get('[data-test-id="modale_connexion"] form button[type="submit"]').click();
      // Attendre apparition du changement de menu "connexion" devient "logout" pour confirmer la connexion  
      cy.contains('logout');
});

// Méthode pour le remplissage du formulaire d'un nouveau pdf
Cypress.Commands.add('newPdf', (smallDescription, description) => {
  cy.get('[data-test-id="modalePdf"] form').within(() => {
    cy.get('input[formControlName="smallDescription"]').type(smallDescription); 
    cy.get('textarea[formControlName="description"]').type(description); 

    // Charge le fichier PDF de test
    const fileName = 'pdfTest.pdf';
    cy.fixture(fileName).then(fileContent => {
      // Cible l'input de fichier et télécharge le fichier PDF
      cy.get('input[formControlName="pdfFile"]').attachFile({
        fileContent,
        fileName,
        mimeType: 'application/pdf'
      });
    });

    const timeout = 10000; 

    // J'attends 10s pour que les options du select se charge sinon erreur
    cy.get('#categories', { timeout }).should('be.visible');
    // Je vérifie que les options soient chargées
    cy.get('#categories option', { timeout }).should('have.length.greaterThan', 1);
    // Je sélectionne l'option
    cy.get('#categories').select('Technologies', { force: true });

    cy.get('#childCategories', { timeout }).should('be.visible');
    cy.get('#childCategories option', { timeout }).should('have.length.greaterThan', 1);
    // Sélectionnez l'option avec le texte visible "Technologies"
    cy.get('#childCategories').select('Dev web', { force: true });

    cy.get('#subChildCategories', { timeout }).should('be.visible');
    cy.get('#subChildCategories option', { timeout }).should('have.length.greaterThan', 1); 
    // Sélectionnez l'option avec le texte visible "Technologies"
    cy.get('#subChildCategories').select('Versioning', { force: true });

    cy.get('#finalCategory', { timeout }).should('be.visible');
    cy.get('#finalCategory option', { timeout }).should('have.length.greaterThan', 1); 
    cy.get('#finalCategory').select('Git', { force: true }); 
  });
});
