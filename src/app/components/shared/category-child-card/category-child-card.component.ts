import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-child-card',
  templateUrl: './category-child-card.component.html',
  styleUrl: './category-child-card.component.css'
})
export class CategoryChildCardComponent {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  @Input() childCategories: Category[] = [];

  constructor(private route: Router) {}
}