import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit{
  // Mon objet "categoriesList" stocke la liste des catégories que je passe à app-categorie-card
  categoriesList: Category[] = [];

  constructor(private categoryService: CategoryService) {}

ngOnInit(): void {
    this.categoryService.getCategorieslist().pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
    .subscribe((categories) => {
      // Je ne veux afficher que les catégories "parent" sur ma hommePage => Je filtre !
      this.categoriesList = categories.filter(categories => categories.parentId == null)
    })
}
}