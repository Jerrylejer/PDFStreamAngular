// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageConnexionComponent } from './pages/page-connexion/page-connexion.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageCharteComponent } from './pages/page-charte/page-charte.component';
import { PageCategorieHomeComponent } from './pages/page-categorie-home/page-categorie-home.component';
import { RechercheComponent } from './components/shared/recherche/recherche.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Page404Component,
    PageConnexionComponent,
    PageInscriptionComponent,
    PageCharteComponent,
    PageCategorieHomeComponent,
    RechercheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
