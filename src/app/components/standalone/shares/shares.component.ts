import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

// MATERIAL TABLES - PARAMETRAGES
displayedColumns: String[] = ['title', 'createdAt', 'evaluation','config'];
dataSource!: MatTableDataSource<Pdf>; 
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
// MATERIAL TABLES - Filtre de recherche
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
// Pour le select cat 1
allCategories: Category[] = [];
selectedParent: any;
// Pour le select cat 2
childCategories: Category[] = [];
selectedChild: any;
// Pour le select cat 3
subChildCategories: Category[] = [];
selectedSubChildCat: any
// Pour le select cat 4
finalCategories: Category[] = [];
selectedFinalCat: any

// Récupération de l'id dans le localStorage
id = Number(localStorage.getItem('userId'));

constructor(private pdfService: PdfService,
  private router: Router,
  private formBuilder: FormBuilder,
  private userService: UserService,
  private categoryService: CategoryService,
  private toast: ToastrService) {}

  // FORMULAIRE DE CREATION
  createForm!: FormGroup;
  // FORMULAIRE UPDATE
  updateForm!: FormGroup;

  // ##############################################
  // ############### NGONINIT #####################
  // ##############################################
  // Initialisation des formulaires, récupération des datas 
  
  ngOnInit(): void {
  // Initialisation du formulaire de creation
  this.createForm = this.formBuilder.group({
    smallDescription: ['', Validators.required],
    description: ['', Validators.required],
    image: [null, Validators.required],
    pdfFile: [null, Validators.required],
    categories: ['', Validators.required],
    childCategories:[null, Validators.required],
    subChildCategories:[null, Validators.required],
    finalCategory: [null, Validators.required],
    author: [this.id]
  });
  // Initialisation du formulaire d'update
  this.updateForm = this.formBuilder.group({
    updatedSmallDesc: [''],
    updatedDesc: [''],
    updatedImage: [null],
    updatedFile: [null],
    updatedCategory: [''],
    updatedChildCategories:[null],
    updatedSubChildCategories:[null],
    updatedFinalCategory: [null],
  });

  // CREATEFORM => Surveillance du premier input select
  this.createForm.get('categories')!.valueChanges.subscribe((value) => {
    console.log("Cat 1 sélectionnée :", value);
    this.selectedParent = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedParent).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((childCat) => {
      this.childCategories = childCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});

  // CREATEFORM => Surveillance du second input select 
  this.createForm.get('childCategories')!.valueChanges.subscribe((value) => {
    console.log("Cat 2 sélectionnée :", value);
    this.selectedChild = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedChild).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((subChildCat) => {
      this.subChildCategories = subChildCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});

  // CREATEFORM => Surveillance du troisième input select 
  this.createForm.get('subChildCategories')!.valueChanges.subscribe((value) => {
    console.log("Cat 3 sélectionnée :", value);
    this.selectedSubChildCat = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedSubChildCat).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((finalCat) => {
      this.finalCategories = finalCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});

  // UPDATEFORM => Surveillance du premier input select
  this.updateForm.get('updatedCategory')!.valueChanges.subscribe((value) => {
    console.log("Cat 1 sélectionnée :", value);
    this.selectedParent = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedParent).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((childCat) => {
      this.childCategories = childCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});

  // UPDATEFORM => Surveillance du second input select 
  this.updateForm.get('updatedChildCategories')!.valueChanges.subscribe((value) => {
    console.log("Cat 2 sélectionnée :", value);
    this.selectedChild = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedChild).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((subChildCat) => {
      this.subChildCategories = subChildCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});

  // UPDATEFORM => Surveillance du troisième input select 
  this.updateForm.get('updatedSubChildCategories')!.valueChanges.subscribe((value) => {
    console.log("Cat 3 sélectionnée :", value);
    this.selectedSubChildCat = value; // Stockez la valeur sélectionnée
    this.categoryService.getCategoryByParentId(this.selectedSubChildCat).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((finalCat) => {
      this.finalCategories = finalCat.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      })
    })
});


  // Récupération des pdfs d'un User connecté
  // J'identifie le user => Requête de récupération de l'objet user
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
      // Je trie mes catégories par ordre alpha et je ne retourne que les catégories mères
      this.allCategories = response.sort((a, b) => {
        if(a.title! < b.title!) return -1;
        if(a.title! > b.title!) return 1;
        return 0;
      }).filter(cat => cat.parentId == null);
    }
    )
  }

  // ######################################################################
  // ############### METHODES ADMINISTRATION DES PDFS #####################
  // ######################################################################

  // Création d'un pdf
  createPdf() {
    const formData = new FormData();
    formData.append('smallDescription', this.createForm.value.smallDescription);
    formData.append('description', this.createForm.value.description);
    // formData.append('categories', this.createForm.value.categories);
    formData.append('categories', this.createForm.value.finalCategory);
    formData.append('author', this.createForm.value.author);

    const image = this.createForm.get('image')?.value;
    if (image) {
      const imageInput = <HTMLInputElement>document.getElementById('image'); 
      if (imageInput.files && imageInput.files.length > 0) {
        const imageToUpload = imageInput.files[0]; // Récupère le fichier à partir de l'élément input
        formData.append('image', imageToUpload, imageToUpload.name);
      }
    }

    const pdfFile = this.createForm.get('pdfFile')?.value;
    if (pdfFile) {
      const fileInput = <HTMLInputElement>document.getElementById('pdfFile'); // Récupère l'élément input
      if (fileInput.files && fileInput.files.length > 0) {
        const fileToUpload = fileInput.files[0]; // Récupère le fichier réel à partir de l'élément input
        formData.append('pdfFile', fileToUpload, fileToUpload.name);
  
        // Appel à mon service
        this.pdfService.uploadPdf(formData).pipe(
          catchError((error) => {
            console.log("erreur mon ptit gars!");
            return throwError(() => error);
          })
        )
        .subscribe(
          (response) => {
            this.toast.success("L'ajout du pdf est confirmé !");
            console.log(response, "pdf enregistré");
            this.closeCreationModale();
            this.ngOnInit();
          }
        );
      } else {
        this.toast.warning("Une erreur est survenue, merci de recommencer !");
        console.error('Aucun fichier sélectionné');
      }
    }
}
  
  // Suppression d'un pdf
  deletePdf() {
    const pdfId: any = Number(this.pdfToDelete.id);
      this.pdfService.deletePdf(pdfId).subscribe({
        next: (res) => {
          this.toast.success("Le pdf a été correctement supprimé !");
          this.closeDeleteModale();
          this.ngOnInit();
        },
        error: (e) => console.error(e)
      });
    }
  
  // I - UPDATE DU PDF -> Afficher le pdf sélectionné
  // showPdf => Je récupère les données via this.pdfService.getPdfById(pdf.id)
  // showPdf => J'affiche les datas dans le formulaire
  pdfAuthor: any = '';
  pdfTitle: any = ''; 
  pdfSmallDesc: any = ''; 
  pdfDesc: any = ''; 
  pdfCategory: any = ''; 

 showPdf(pdf: any) {
    // Je requête le pdf par son id 
    this.pdfService.getPdfById(pdf.id).pipe(
      catchError((error) => {
        this.toast.warning("Une erreur est survenue, merci de recommencer !");
        return throwError(() => error);
      })
    )
    .subscribe(
      (response) => {
        console.log(response)
        // Je récupère les données du pdf puis les affcihe grâce au binding de propriété [value] dans le form
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

    // J'hydrate mon pdf avec les données mises à jour
  if (formValues.updatedSmallDesc !== '') {
      formData.append('smallDescription', formValues.updatedSmallDesc);
      console.log(formValues.updatedSmallDesc)
  }
  if (formValues.updatedDesc !== '') {
      formData.append('description', formValues.updatedDesc);
      console.log(formValues.updatedDesc)
  }
  if (formValues.updatedCategory !== '') {
      formData.append('categories', formValues.updatedFinalCategory);
      console.log(formValues.updatedFinalCategory)
  }

  const updatedImage = this.updateForm.get('updatedImage')?.value;
  if (updatedImage) {
    const imageInput = <HTMLInputElement>document.getElementById('updatedImage'); 
    if (imageInput.files && imageInput.files.length > 0) {
      const imageToUpdate = imageInput.files[0]; // Récupère le fichier réel à partir de l'élément input
      formData.append('image', imageToUpdate, imageToUpdate.name);
    }
  }

  const updatedFile = this.updateForm.get('updatedFile')?.value;
  if (updatedFile) {
    const fileInput = <HTMLInputElement>document.getElementById('updatedFile');
    if (fileInput.files && fileInput.files.length > 0) {
      const fileToUpdate = fileInput.files[0]; // Récupère le fichier réel à partir de l'élément input
      formData.append('pdfFile', fileToUpdate, fileToUpdate.name);
    }
  }

  this.pdfService.updatePdf(pdfId, formData).pipe(
    catchError((error) => {
      this.toast.warning("Une erreur est survenue, merci de recommencer !");
      console.log("erreur");
      return throwError(() => error);
    })
  )
  .subscribe(
    (response) => {console.log(response, "pdf modifié !"),
    this.toast.success("Le pdf a été correctement modifié !");
    this.closeUpdateModale();
    this.ngOnInit();
  }
  )
}
}

