describe('test to create and upload a pdf', () => {
  beforeEach(() => {
    // Voir dans commands.ts pour paramétrer la connexion d'un user
    cy.login("Jérôme", "MonSuperPassword1234");
  })
    it('passes', () => {
      // je clique sur mon username
      cy.get('[data-test-id="username"]').click();
      // Je dois aller sur dashboard/partages
      cy.get('[data-test-id="partages"]').click();
      // Je clique sur btn ajouter
      cy.get('[data-test-id="ajouter"]').click();
      // Je vérifie l'affichage du formulaire
      cy.get('[data-test-id="modalePdf"]');
      // Je lance une autre commands.ts pour remplir le formulaire
      cy.newPdf("testCypress - smallDescription", "testCypress - description");
      // Forcer le clic sur le bouton
      cy.get('[data-test-id="modalePdf"] form button[type="submit"]').click({ force: true });
      // Attendre 10 secondes pour constater le toast succès mais ne vient pas ... 
      // cy.wait(10000);
    })
  })