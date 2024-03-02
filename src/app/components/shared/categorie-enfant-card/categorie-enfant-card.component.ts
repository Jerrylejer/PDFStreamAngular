import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categorie-enfant-card',
  templateUrl: './categorie-enfant-card.component.html',
  styleUrl: './categorie-enfant-card.component.css'
})
export class CategorieEnfantCardComponent {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  @Input() childCategories: Category[] = [];

  constructor(private route: Router) {}
}
