import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageParamsComponent } from './pages/page-params/page-params/page-params.component';

const routes: Routes = [
  {
    path:"",
    component:PageHomeComponent
  },
  {
    path:"params",
    component:PageParamsComponent
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
