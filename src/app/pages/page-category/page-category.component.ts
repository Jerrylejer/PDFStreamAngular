import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.css'
})
export class PageCategoryComponent implements OnInit{

  // PageCategorieComponent est lié au path "categorie/:categorieId" dans le app-routing
  categorieId!: string;
  // Je stocke dans childsCategorieList les dataa reçues de ma requête getCategoryByParentId() et passe la propriété à app-categorie-enfant-card.ts
  childsCategorieList: Category[] = [];

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        // J'initialise "categorieId!: string;" avec mon paramètre de route
        this.categorieId = params['categorieId'];
        console.log('id de la catégorie cliquée : ', this.categorieId)
      })
      // Je demande au service de loader les catégories enfants de la catégorie parent cliquée
      this.categoryService.getCategoryByParentId(Number(this.categorieId)).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
      .subscribe(targetedCategory => {
        console.log(targetedCategory);
        this.childsCategorieList = targetedCategory;
      })
  }
}
