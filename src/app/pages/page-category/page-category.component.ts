import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Pdf } from 'src/app/models/pdf.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.css'
})
export class PageCategoryComponent implements OnInit{
  // PageCategorieComponent est lié au path "categorie/:categorieId" dans le app-routing
  categorieId!: string;
  // Je stocke dans childsCategorieList les datas reçues de ma requête getCategoryByParentId() et passe la propriété à app-categorie-enfant-card.ts
  childsCategorieList: Category[] = [];
  // Je stocke la catégorie parent pour accéder à son title et l'afficher dans la nav left
  parentCategory?: Category;
  // Liste des pdfs de la catégorie parent cliquée
  thisCategoryPdfsList: Pdf[] = [];

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService){}

  ngOnInit(): void {

    // CHARGER LA CATEGORIE MERE 
    // => Afficher title dans nav de gauche et l'éventuelle liste de pdfs correspondante
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params);
        this.categorieId = params.get('categoryId')!;
        return this.categoryService.getCategoryById(Number(this.categorieId)).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        );
      })
    ).subscribe(targetedCategory => {
      console.log(targetedCategory);
      // Si une catégorie est "finale" => elle détient une liste de pdfs, je la stocke dans pdfsList
      if(targetedCategory.pdfList != null) {
        this.thisCategoryPdfsList = targetedCategory.pdfList!;
        console.log(this.thisCategoryPdfsList);
      }
      // Et nje stocke le title de la catégorie dans parentCategory
      this.parentCategory = targetedCategory;
    });

    // CHARGER LA LISTE DES CATEGORIES ENFANTS
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // path:"categories/:categorieId" de app.routing
        this.categorieId = params.get('categoryId')!;
         console.log('id de la catégorie cliquée : ', this.categorieId);
         // Je requête les catégories issues d'une catégorie "mère"
         return this.categoryService.getCategoryByParentId(Number(this.categorieId)).pipe(
           catchError((error) => {
             return throwError(() => error);
            })
            );
          })
          )
      .subscribe(targetedCategory => {
        console.log(targetedCategory);
        // Je trie le tableau par ordre alphabétique
        this.childsCategorieList = targetedCategory.sort((a, b) => {
          // Si valeur négative (-1), cela indique à la méthode sort() que le premier élément (a) doit être placé avant le second élément (b)
          if (a.title! < b.title!) return -1;
          // Si valeur positive (1), cela indique à la méthode sort() que le premier élément (a) doit être placé après le second élément (b)
          if (a.title! > b.title!) return 1;
          return 0;
        });
      });
  }
}
