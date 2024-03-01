import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrl: './categorie-card.component.css'
})
export class CategorieCardComponent implements OnInit {
  // Je réceptionne la liste des catégories de categorie-list.component et stocke la liste dans categories
  // Dans le html, je boucle dessus pour accéder aux props de chacune des catégories et les afficher individuellement
  @Input() categories: Category[] = [];

  constructor(private route: Router) {}

 ngOnInit(): void {

 }

 hello(): void {
  console.log("hello")
 }
}

