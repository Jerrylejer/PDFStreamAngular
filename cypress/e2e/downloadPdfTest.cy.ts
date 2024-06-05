describe('test to download a pdf by id', () => {
    beforeEach(() => {
      // Voir dans commands.ts pour paramétrer la connexion d'un user
      cy.login("Jérôme", "MonSuperPassword1234");
    })
    it('passes', () => {
      // Visiter la page d'un pdf
      cy.visit('http://localhost:4200/category/15/137')
      // vérifier la présence du btn "Télécharger" et cliquer
      cy.get('[data-test-id="downloadBtn"]').click();
      // Vérifier si modale pré-téléchargement apparait et cliquer pour télécharger le pdf
      cy.get('[data-test-id="modaleDownloadBtn"]').click();
    })
  })