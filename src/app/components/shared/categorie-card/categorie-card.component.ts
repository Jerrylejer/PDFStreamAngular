import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrl: './categorie-card.component.css'
})
export class CategorieCardComponent {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  @Input() categories: Category[] = [];

  constructor(private route: Router) {}

}

