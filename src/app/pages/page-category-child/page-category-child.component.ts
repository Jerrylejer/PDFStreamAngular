import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-page-category-child',
  templateUrl: './page-category-child.component.html',
  styleUrl: './page-category-child.component.css'
})
export class PageCategoryChildComponent implements OnInit{

  // PageCategorieComponent est lié au path "categorie/:categorieId" dans le app-routing
  categorieId!: string;
  // Je stocke dans childsCategorieList les datas reçues de ma requête getCategoryByParentId() et passe la propriété à app-categorie-enfant-card.ts
  subChildsCategorieList: Category[] = [];
  // Je stocke la catégorie enfant pour accéder à son title et l'afficher dans la nav left
  childCategory?: Category;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService){}

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // path:"childCategory/:childCategoryId"
        this.categorieId = params.get('childCategoryId')!;
         console.log('id de la childCatégorie cliquée : ', this.categorieId);
         return this.categoryService.getCategoryByParentId(Number(this.categorieId)).pipe(
           catchError((error) => {
             return throwError(() => error);
            })
            );
          })
          )
          // Chargement des catégories enfants de la catégorie parent cliquée dans childsCategorieList
      .subscribe(targetedChildCategory => {
        console.log(targetedChildCategory);
        this.subChildsCategorieList = targetedChildCategory;
      })

      // L'ID EST == A 0, pourquoi ???
      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.categorieId = params.get('childCategoryId')!;
          // Charger la catégorie parent
          return this.categoryService.getCategoryById(Number(this.categorieId)).pipe(
            catchError((error) => {
              return throwError(() => error);
            })
          );
        })
      ).subscribe(targetedChildCategory => {
        console.log(targetedChildCategory);
        this.childCategory = targetedChildCategory;
        console.log(this.childCategory.title)
      });
  }
}
