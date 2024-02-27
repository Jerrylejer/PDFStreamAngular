import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageCategorieComponent } from './pages/page-categorie/page-categorie.component';

const routes: Routes = [
  {
    // ma page "home" affichera la liste des catégories 
    path:"",
    component:PageHomeComponent
  },
  {
    // Le click sur une catégorie mènera à la page de catégorie soumise
    path:"categorie/:id",
    component:PageCategorieComponent
  },
  {
    path:"dashboard",
    component:PageDashboardComponent
  },
  {
    path:"inscription",
    component:PageInscriptionComponent
  },
  {
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
