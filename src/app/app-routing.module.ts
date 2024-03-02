import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageCategorieComponent } from './pages/page-categorie/page-categorie.component';
import { PageCategorieEnfantComponent } from './pages/page-categorie-enfant/page-categorie-enfant.component';
import { PageSousCategorieEnfantComponent } from './pages/page-sous-categorie-enfant/page-sous-categorie-enfant.component';
import { PageListePdfsComponent } from './pages/page-liste-pdfs/page-liste-pdfs.component';
import { PagePdfComponent } from './pages/page-pdf/page-pdf.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    // ma page "home" affichera la liste des catégories 
    path:"categories",
    component:PageHomeComponent
  },
  {
    // => Chemin vers une catégorie 
    path:"categories/:categorieId",
    component:PageCategorieComponent
  },
  {
    // => Chemin vers une catégorie enfant
    path:"categories/:categorieId/:categorieEnfantId",
    component:PageCategorieEnfantComponent
  },
  {
    // => Chemin vers une catégorie enfant de enfant
    path:"categories/:categorieId/:categorieEnfantId/:sousCategorieEnfantId",
    component:PageSousCategorieEnfantComponent
  },
  {
    // => Chemin vers la liste des pdfs d'une catégorie enfant de enfant
    path:"categories/:categorieId/:categorieEnfantId/:sousCategorieEnfantId/listePdfs",
    component:PageListePdfsComponent
  },
  {
    // => Chemin vers un pdf
    path:"categories/:categorieId/:categorieEnfantId/:sousCategorieEnfantId/listePdfs/:pdfId",
    component:PagePdfComponent
  },
  {
    // Dashboard user
    path:"dashboard",
    component:PageDashboardComponent
  },
  {
    // Chemin vers l'inscription
    path:"inscription",
    component:PageInscriptionComponent
  },
  {
    // Page 404
    path:"not-found",
    component:Page404Component
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
