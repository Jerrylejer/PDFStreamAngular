import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCategoryChildComponent } from './pages/page-category-child/page-category-child.component';
import { PageCategorySubChildComponent } from './pages/page-category-sub-child/page-category-sub-child.component';
import { PagePdfsListComponent } from './pages/page-pdfs-list/page-pdfs-list.component';
import { PagePdfComponent } from './pages/page-pdf/page-pdf.component';

const routes: Routes = [
  { path: '', redirectTo: 'allCategories', pathMatch: 'full' },
  {
    // ma page "home" affichera la liste des catégories 
    path:"allCategories",
    component:PageHomeComponent
  },
  {
    // => Chemin vers une catégorie 
    path:"category/:categoryId",
    component:PageCategoryComponent
  },
  {
    // => Chemin vers une catégorie enfant
    path:"childCategory/:childCategoryId",
    component:PageCategoryChildComponent
  },
  {
    // => Chemin vers une catégorie enfant de enfant
    path:"subChildCategory/:subChildCategoryId",
    component:PageCategorySubChildComponent
  },
  {
    // => Chemin vers la liste des pdfs d'une catégorie enfant de enfant
    path:"subChildCategory/pdfsList",
    component:PagePdfsListComponent
  },
  {
    // => Chemin vers un pdf
    path:"subChildCategory/pdfsList/:pdfId",
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
