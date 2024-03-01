import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-page-categorie',
  templateUrl: './page-categorie.component.html',
  styleUrl: './page-categorie.component.css'
})
export class PageCategorieComponent implements OnInit{

  // avec ! je notifie à mon composant que la data sera fournie ultérieurement
  // Sera fourni au click de la catégorie dans la liste des catégories
  // PageCategorieComponent est lié au path "categorie/:categorieId" dans le app-routing
  categorieId!: string;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        // J'initialise "categorieId!: string;" avec mon paramètre de route
        this.categorieId = params['categorieId'];
        console.log('id de la catégorie cliquée : ', this.categorieId)
      })
      // Je demande au service de loader les ctégories enfant de la catégorie parent cliquée
      this.categoryService.getCategoryByParentId(Number(this.categorieId)).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
      .subscribe(targetedCategory => {
        console.log(targetedCategory)
      })
  }
}
