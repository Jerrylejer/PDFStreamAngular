// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
// Material tables
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { DashboardComponent } from './components/standalone/dashboard/dashboard.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { CategorieCardComponent } from './components/shared/categorie-card/categorie-card.component';
import { CategorieListComponent } from './components/standalone/categorie-list/categorie-list.component';

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
    DashboardComponent,
    PageDashboardComponent,
    CategorieCardComponent,
    CategorieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
