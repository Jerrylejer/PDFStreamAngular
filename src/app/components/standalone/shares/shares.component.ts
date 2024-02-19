import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Pdf } from 'src/app/models/pdf.model';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrl: './shares.component.css'
})
export class SharesComponent implements OnInit{
// Material Tables configuration
displayedColumns: String[] = ['title', 'createdAt', 'evaluation','config'];
dataSource!: MatTableDataSource<Pdf>; 
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

// MODALES
// Boolean pour rendre la modale création visible ou non au click "ajouter"
displayCreationModale = "none";
displayDeleteModale = "none";
openCreationModale() {
  this.displayCreationModale = "block";
  this.resetPdfForm();
}
openDeleteModale() {
  this.displayDeleteModale = "block";
}
closeCreationModale() {
  this.displayCreationModale = "none";
}
closeDeleteModale() {
  this.displayDeleteModale = "none";
}

// Filtre de recherche
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

// Booléan pour switcher du mode formulaire / formulaire soumis
submitted = false;

// Interface qui reçoit les données du formulaire
pdf: Pdf = {
  title: '',
  createdAt: new Date(),
  evaluations: [],
}

// Formulaire
pdfForm!: FormGroup;
// Propriété de class qui stocke la liste des pdfs partagés par le user
uploadedPdf?: Pdf[] = []; 
// Propriété de class qui stocke les différentes catégories paramétrées en bdd
allCategories: Category[] = [];
// Récupération de l'id dans le localStorage
id = Number(localStorage.getItem('userId'));

constructor(private pdfService: PdfService,
  private router: Router,
  // private formBuilder: FormBuilder,
  private userService: UserService) {}

ngOnInit(): void {
  // Il faut que je récupère l'objet user 
  this.userService.getUserById(this.id).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
    )
    .subscribe({
      next: (user) => {
        // J'initialise "uploadedPdf" avec les pdfs du user
        this.uploadedPdf = user.pdfs;
        // Je les envoie dans MatTable
        this.dataSource = new MatTableDataSource(this.uploadedPdf);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.submitted = false;
      },
      error: (e) => console.error(e)
    });
  }
  
  // ######################################################################
  // ############### METHODES ADMINISTRATION DES PDFS #####################
  // ######################################################################
  
  // Interface céation d'un nouveau pdf
  pdfToCreate: Pdf = {
    title: '',
    smallDescription: '',
    description:'',
    image: '',
    categories: []
  }
  
  // Interface modification d'un pdf
  pdfToUpdate: Pdf = {
    title: '',
    smallDescription: '',
    description:'',
    image: '',
    categories: []
  }
  
  // Remise à 0 du formulaire
  resetPdfForm(): void {
    this.submitted = false;
    this.pdf = {
      title: '',
      smallDescription: '',
      description:'',
      image: '',
      categories: []
    }
  }
  
  // Suppression d'un pdf
  deletePdf(pdf: any) {
    const pdfId: number = pdf.id;
    const pdfTitle: String = pdf.title;
    if (confirm(`Voulez-vous supprimer le poste ${pdfTitle} ?`)) {
      console.log(pdfId);
      this.pdfService.deletePdf(pdfId).subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
        },
        error: (e) => console.error(e)
      });
    }
  }
  
  // Sélectionner et afficher les datas du pdf dans la modale d'update
  selectedPdf(pdf: any) {
    // Je récupère le bon pdf par l'id et je passe les datas à mon objet "filmToUpdate"
    this.pdfService.getPdfById(pdf.id).subscribe({
      // Je récupère les données issuent du pdf sélectionné et les initialise dans mon interface "pdfToUpdate"
      // J'affiche ainsi dans ma modale d'update, les données du pdf sélectionné avec [(ngModel)]
      next: (selectedPdf) => {
        this.pdfToUpdate.id = selectedPdf.id;
        this.pdfToUpdate.title = selectedPdf.title;
        this.pdfToUpdate.smallDescription = selectedPdf.smallDescription;
        this.pdfToUpdate.description = selectedPdf.description;
        this.pdfToUpdate.image = selectedPdf.image;
        this.pdfToUpdate.categories = selectedPdf.categories;
      },
      error: (e) => console.error(e)
    })
  }
  
}

// Reactiveform (voir si je l'adapte)
// Initialisation du formulaire d'update
// this.pdfForm = this.formBuilder.group({
//   author: ['', Validators.required],
//   smallDescription: ['', Validators.required],
//   description: ['', Validators.required],
//   pdfFile: ['', Validators.required],
// });
