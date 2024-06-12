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
      // Attendre apparition du changement de menu pour confirmer la connexion  
      cy.get('[data-test-id="logout"]');
});

// Méthode pour le test de remplissage du formulaire d'un nouveau pdf
Cypress.Commands.add('newPdf', (smallDescription, description) => {
  cy.get('[data-test-id="modalePdf"] form').within(() => {
    cy.get('input[formControlName="smallDescription"]').type(smallDescription); 
    cy.get('textarea[formControlName="description"]').type(description); 
    //cy.get('input[formControlName="pdfFile"]').selectFile('cypress/fixtures/example.pdf').type(pdfFile);

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
    cy.get('#categories').select('Technologies',{force: true});
    cy.get('#categories').contains('Technologies');
    cy.get('#childCategories').select('Dev web',{force: true});
    cy.get('#childCategories').contains('Dev web');
    cy.get('#subChildCategories').select('Versioning',{force: true});
    cy.get('#subChildCategories').contains('Versioning');
    cy.get('#finalCategory').select('Git',{force: true});
    cy.get('#finalCategory').contains('Git');
    // NE FONCTIONNE PAS ---> A VOIR
    cy.get('[data-test-id="modalePdf"] form button[type="submit"]').click();
  });
});
