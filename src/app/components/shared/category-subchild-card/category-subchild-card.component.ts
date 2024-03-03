import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-subchild-card',
  templateUrl: './category-subchild-card.component.html',
  styleUrl: './category-subchild-card.component.css'
})
export class CategorySubchildCardComponent {
// Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
@Input() subChildCategories: Category[] = [];
}
