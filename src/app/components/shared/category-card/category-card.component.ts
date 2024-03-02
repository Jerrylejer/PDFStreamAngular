import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  @Input() categories: Category[] = [];

  constructor(private route: Router) {}

}

