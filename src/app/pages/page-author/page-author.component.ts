import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-author',
  templateUrl: './page-author.component.html',
  styleUrl: './page-author.component.css'
})
export class PageAuthorComponent implements OnInit{
// Je stocke les datas auteur
userDatas?: User;
// Je stocke l'id du pdf issue de la route
authorId?: string;
// Je stocke la liste des pdfs de l'author
pdfsList?: Pdf[];
// Je stocke l'id du pdf
pdfId?: number;
// Je stocke l'id de la categorie
pdfCategoryId?: number;

// MATERIAL TABLES - PARAMETRAGES
displayedColumns: String[] = ['title', 'createdAt', 'counter','evaluation'];
dataSource!: MatTableDataSource<User>; 
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

  constructor(private pdfService: PdfService, 
    private userService: UserService, 
    private activatedRoute: ActivatedRoute,
    private router: Router){};

  ngOnInit(): void {
      // -> Je veux récupérer tous les pdfs d'un author
      // -> J'ai l'id de l'author dans la route et mon pdfUser fourni la méthode getUserById(id: number)
      // --> voir comment récupérer via pdfService et la méthode getPdfsListByAuthor(id: User)
      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          console.log(params);
          this.authorId = params.get('authorId')!;
          return this.userService.getUserById(Number(this.authorId)).pipe(
            catchError((error) => {
              return throwError(() => error);
            })
            );
          })
      )
      .subscribe({
        next: (user) => {
          // J'initialise "pdfsList" avec les pdfs du user (j'utilise les props de l'objet)
          this.pdfsList = user.pdfs;
          this.userDatas = user;
          console.log(this.pdfsList);
          // et je les envoie dans MatTable
          this.dataSource = new MatTableDataSource(this.pdfsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (e) => console.error(e)
      })
  }

  // Méthode qui redirige vers la page du PDF au click
  routerToPdfPage(id: number) {
    console.log(id);
    // ###############################################
    // PISTE A CREUSER
    // Il faut que j'arrive à capter l'id de la catégorie contenu dans la table de liaison "pdf-category"
    this.pdfService.getPdfById(id).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
      )
      .subscribe(
        {
          next: (pdfDatas) => {
            // Pour supprimer l'erreur pdfDatas.categories may be undefined => Je m'assure qu'il existe
            if (pdfDatas.categories && pdfDatas.categories.length > 0) {
              console.log(pdfDatas.categories[0].id);
              this.pdfCategoryId = pdfDatas.categories[0].id;
              this.pdfId = id;
              this.router.navigate(["/category", this.pdfCategoryId, this.pdfId]);
              // "['/category', parentCategory!.id, pdf.id]"
            } else {
              console.warn('No categories found for this PDF');
            }
          },
          error: (e) => console.error(e)
        }
      );
  }
}
