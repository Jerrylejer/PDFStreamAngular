// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Angular Material -- pour mes tables
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Angular Material -- pour mon menu burger
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Components 
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { NavCategoriesComponent } from './components/shared/nav-categories/nav-categories.component';
import { RegistrationFormComponent } from './components/standalone/registration-form/registration-form.component';
import { AccountComponent } from './components/standalone/account/account.component';
import { SharesComponent } from './components/standalone/shares/shares.component';
import { ConventionComponent } from './components/standalone/convention/convention.component';
import { DashboardComponent } from './components/standalone/dashboard/dashboard.component';
import { CategoryCardComponent } from './components/shared/category-card/category-card.component';
import { CategoriesListComponent } from './components/standalone/categories-list/categories-list.component';
import { PdfCardComponent } from './components/shared/pdf-card/pdf-card.component';
import { BackButtonComponent } from './components/shared/back-button/back-button.component';
// Pages 
import { Page404Component } from './pages/page404/page404.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PagePdfComponent } from './pages/page-pdf/page-pdf.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageAuthorComponent } from './pages/page-author/page-author.component';
// Pipes
import { FileSizePipe } from './pipes/file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Page404Component,
    PageInscriptionComponent,
    PageHomeComponent,
    BannerComponent,
    NavCategoriesComponent,
    RegistrationFormComponent,
    PageCategoryComponent,
    PagePdfComponent,
    AccountComponent,
    SharesComponent,
    ConventionComponent,
    DashboardComponent,
    PageDashboardComponent,
    CategoryCardComponent,
    CategoriesListComponent,
    PdfCardComponent,
    FileSizePipe,
    BackButtonComponent,
    PageAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
