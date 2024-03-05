import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
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
  // Je stocke dans childsCategorieList les datas reçues de ma requête getCategoryByParentId() et passe la propriété à app-categorie-enfant-card.ts
  childsCategorieList: Category[] = [];
  // Je stocke la catégorie parent pour accéder à son title et l'afficher dans la nav left
  parentCategory?: Category;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService){}

  ngOnInit(): void {
    // Le ngOnInit ne s'active qu'au lancement du composant
    // Bug : Au premier click sur la categorie-nav mon composant se loade correctement
    // Au second click, puisque PageCategoryComponentest déjà lancé, plus rien ne se passe => ngOnInit ne lance plus les requêtes
    // Solution => swithMap (observable rxjs) observe les modifs des params URL et relance les requêtes API si necessaire
    // paramMap émet un objet ParamMap à chaque modification des paramètres d'URL. 
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
          // Chargement des catégories enfants de la catégorie parent cliquée dans childsCategorieList
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
      })

      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.categorieId = params.get('categoryId')!;
          // Charger la catégorie parent
          return this.categoryService.getCategoryById(Number(this.categorieId)).pipe(
            catchError((error) => {
              return throwError(() => error);
            })
          );
        })
      ).subscribe(targetedCategory => {
        console.log(targetedCategory);
        this.parentCategory = targetedCategory;
      });
  }
}
