import { Component, Input, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrl: './categorie-card.component.css'
})
export class CategorieCardComponent {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  // Dans le html, je boucle dessus pour accéder aux props de chacune des catégories et les afficher individuellement
  @Input() categories!: Category;
}

