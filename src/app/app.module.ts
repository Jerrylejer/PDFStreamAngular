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
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { NavCategoriesComponent } from './components/shared/nav-categories/nav-categories.component';
import { SearchComponent } from './components/shared/search/search.component';
import { RegistrationFormComponent } from './components/standalone/registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Page404Component,
    PageConnexionComponent,
    PageInscriptionComponent,
    PageCharteComponent,
    PageHomeComponent,
    SearchComponent,
    BannerComponent,
    NavCategoriesComponent,
    RegistrationFormComponent,
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
