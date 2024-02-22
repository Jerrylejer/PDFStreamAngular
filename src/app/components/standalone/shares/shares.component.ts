import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Pdf } from 'src/app/models/pdf.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrl: './shares.component.css'
})
export class SharesComponent implements OnInit{

// MATERIAL TABLES
displayedColumns: String[] = ['title', 'createdAt', 'evaluation','config'];
dataSource!: MatTableDataSource<Pdf>; 
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
// Filtre de recherche
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

// MODALES
// Boolean pour rendre la modale création visible ou non au click "ajouter"
displayCreationModale = "none";
displayUpdateModale = "none";
displayDeleteModale = "none";
pdfToUpdate: Pdf = {};
pdfToDelete: Pdf = {};

openCreationModale() {
  this.displayCreationModale = "block";
  // this.resetPdfForm();
}

openUpdateModale(pdf: any) {
  this.displayUpdateModale = "block";
  // Je passe l'objet à ma prop de class "pdfToUpdate", objet que j'utilise dans updatePdf()
  this.pdfToUpdate = pdf;
  // J'affiche les caractéristiques du pdf à modifier dans mon formulaire (callback)
  this.showPdf(pdf);
}

openDeleteModale(pdf: any) {
  this.displayDeleteModale = "block";
  // Je passe l'objet à ma prop de class "pdfToDelete", objet que j'utilise dans deletePdf()
  this.pdfToDelete = pdf;
}

closeCreationModale() {
  this.displayCreationModale = "none";
}

closeUpdateModale() {
  this.displayUpdateModale = "none";
}

closeDeleteModale() {
  this.pdfToDelete = {};
  this.displayDeleteModale = "none";
}

// Booléan pour switcher du mode formulaire / formulaire soumis
submitted = false;

// LISTE DES PDFS
uploadedPdf?: Pdf[] = []; 

// LISTE DES CATEGORIES
allCategories: Category[] = [];

// Récupération de l'id dans le localStorage
id = Number(localStorage.getItem('userId'));

constructor(private pdfService: PdfService,
  private router: Router,
  private formBuilder: FormBuilder,
  private userService: UserService,
  private categoryService: CategoryService) {}

  // FORMULAIRE DE CREATION
  createForm!: FormGroup;
  // FORMULAIRE UPDATE
  updateForm!: FormGroup;
  
  ngOnInit(): void {

  // Initialisation du formulaire de creation
  this.createForm = this.formBuilder.group({
    author: ['', Validators.required], // invisible client ou non accessible
    pdfTitle:['', Validators.required],
    pdfSmallDesc: ['', Validators.required],
    pdfDesc: ['', Validators.required],
    pdfImage: ['', Validators.required],
    pdfFile: ['', Validators.required],
    pdfCategory: ['', Validators.required]
  });

  // Initialisation du formulaire d'update
  this.updateForm = this.formBuilder.group({
    author: ['', Validators.required], // invisible client ou non accessible
    pdfUpdatedTitle: [''],
    pdfUpdatedSmallDesc: [''],
    pdfUpdatedDesc: [''],
    pdfUpdatedImage: [''],
    pdfUpdatedFile: [''],
    pdfUpdatedCategory: ['']
  });

  // Récupération des pdfs d'un User connecté
  // Requête de récupération de l'objet user
  this.userService.getUserById(this.id).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
    )
    .subscribe({
      next: (user) => {
        // J'initialise "uploadedPdf" avec les pdfs du user (j'utilise les props de l'objet)
        this.uploadedPdf = user.pdfs;
        // et je les envoie dans MatTable
        this.dataSource = new MatTableDataSource(this.uploadedPdf);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.submitted = false;
      },
      error: (e) => console.error(e)
    });

    // Récupération de toutes les Catégories
    this.categoryService.getCategorieslist().pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((response) => {
      this.allCategories = response;
    }
    )
  }
  
  // ######################################################################
  // ############### METHODES ADMINISTRATION DES PDFS #####################
  // ######################################################################
  
  // Création d'un pdf
  createPdf() {
    const pdfTitle: any = this.createForm.value.pdfTitle;
    const pdfSmallDesc: any = this.createForm.value.pdfSmallDesc;
    const pdfDesc: any = this.createForm.value.pdfDesc;
    const pdfImage: any = this.createForm.value.pdfImage;
    const pdfFile: any = this.createForm.value.pdfFile;
    const pdfCategory: any = this.createForm.value.pdfCategory;
    // Appel à mon service
    this.pdfService.uploadPdf(pdfTitle, pdfSmallDesc, pdfDesc, pdfImage, pdfFile, pdfCategory).pipe(
      catchError((error) => {
        console.log("erreur mon ptit gars!");
        //this.ngOnInit();
        return throwError(() => error);
      })
    )
    .subscribe(
      (response) => {console.log(response, "datas modifiées !"),
    this.closeUpdateModale();
    this.ngOnInit();
    }
    )
  }
  
  // Suppression d'un pdf
  deletePdf() {
    const pdfId: any = Number(this.pdfToDelete.id);
      this.pdfService.deletePdf(pdfId).subscribe({
        next: (res) => {
          this.closeDeleteModale();
          this.ngOnInit();
        },
        error: (e) => console.error(e)
      });
    }
  
  // I - UPDATE DU PDF -> Afficher le pdf sélectionné
  // Récupération des datas this.pdfService.getPdfById(pdf.id)
  // puis valeurs communiquées au Form d'update
  pdfAuthor: any = '';
  pdfTitle: any = ''; 
  pdfSmallDesc: any = ''; 
  pdfDesc: any = ''; 
  pdfCategory: any = ''; 

 showPdf(pdf: any) {
    // Je requête le pdf par son id 
    this.pdfService.getPdfById(pdf.id).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe(
      (response) => {
        console.log(response)
        // Je récupère les données du pdf, ok
        this.pdfAuthor = response.author
        this.pdfTitle = response.title;
        this.pdfSmallDesc = response.smallDescription;
        this.pdfDesc = response.description;
        this.pdfCategory = response.categories
        }
    )
  }
  // II - UPDATE DU PDF -> modifier le PDF
  updatePdf() {
    const pdfId: any = Number(this.pdfToUpdate.id);

    const formData: FormData = new FormData();
    const formValues = this.updateForm.value;

  if (formValues.pdfUpdatedTitle !== '') {
      formData.append('title', formValues.pdfUpdatedTitle);
      console.log(formValues.pdfUpdatedTitle)
  }
  if (formValues.pdfUpdatedSmallDesc !== '') {
      formData.append('smallDescription', formValues.pdfUpdatedSmallDesc);
      console.log(formValues.pdfUpdatedSmallDesc)
  }
  if (formValues.pdfUpdatedDesc !== '') {
      formData.append('description', formValues.pdfUpdatedDesc);
      console.log(formValues.pdfUpdatedDesc)
  }
  if (formValues.pdfUpdatedImage) {
      formData.append('image', formValues.pdfUpdatedImage);
      console.log(formValues.pdfUpdatedImage)
  }
  if (formValues.pdfUpdatedFile) {
      formData.append('pdfFile', formValues.pdfUpdatedFile);
      console.log(formValues.pdfUpdatedFile)
  }
  if (formValues.pdfUpdatedCategory !== '') {
      formData.append('category', formValues.pdfUpdatedCategory);
      console.log(formValues.pdfUpdatedCategory)
  }
    this.pdfService.updatePdf(pdfId, formData).pipe(
      catchError((error) => {
        console.log("erreur");
        return throwError(() => error);
      })
    )
    .subscribe(
      (response) => {console.log(response, "datas modifiées !"),
    this.closeUpdateModale();
    this.ngOnInit();
    }
    )
  }
}

