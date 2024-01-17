import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCategorieHomeComponent } from './pages/page-categorie-home/page-categorie-home.component';

const routes: Routes = [
  {
    path:"",
    component:PageCategorieHomeComponent
  },
  {
    path:"charte",
    component:PageCategorieHomeComponent
  },
  {
    path:"connexion",
    component:PageCategorieHomeComponent
  },
  {
    path:"inscription",
    component:PageCategorieHomeComponent
  },
  {
    path:"not-found",
    component:PageCategorieHomeComponent
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
