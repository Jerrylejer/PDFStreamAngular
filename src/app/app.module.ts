// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { NavCategoriesComponent } from './components/shared/nav-categories/nav-categories.component';
import { SearchComponent } from './components/shared/search/search.component';
import { RegistrationFormComponent } from './components/standalone/registration-form/registration-form.component';
import { PageCategorieComponent } from './pages/page-categorie/page-categorie.component';
import { PageSousCategorieComponent } from './pages/page-sous-categorie/page-sous-categorie.component';
import { PagePdfComponent } from './pages/page-pdf/page-pdf.component';
import { AccountComponent } from './components/standalone/account/account.component';
import { CollectionComponent } from './components/standalone/collection/collection.component';
import { SharesComponent } from './components/standalone/shares/shares.component';
import { ConventionComponent } from './components/standalone/convention/convention.component';
import { PageParamsComponent } from './pages/page-params/page-params/page-params.component';
import { ParamsComponent } from './components/shared/params/params.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Page404Component,
    PageInscriptionComponent,
    PageHomeComponent,
    SearchComponent,
    BannerComponent,
    NavCategoriesComponent,
    RegistrationFormComponent,
    PageCategorieComponent,
    PageSousCategorieComponent,
    PagePdfComponent,
    AccountComponent,
    CollectionComponent,
    SharesComponent,
    ConventionComponent,
    PageParamsComponent,
    ParamsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
