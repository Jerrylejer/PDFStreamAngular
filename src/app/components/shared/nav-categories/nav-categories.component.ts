import { Component, HostListener, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrl: './nav-categories.component.css'
})
export class NavCategoriesComponent implements OnInit{
  color = '#3e515b'; // Couleur de font par défaut
  fontWeight = "600"; // font-weight par défaut
  categoriesList: Category[] = [];

  // Mon écouteur d'évènement au scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    // Changez la couleur de fond si la position de défilement dépasse 200 pixels
    if (scrollPosition > 20) {
      this.color = '#ffffff'; // Changer la couleur de fond en blanc
      this.fontWeight = '200'; // Changer la font weight plus fine
    } else {
      this.color = '#3e515b'; // sinon la couleur de fond par défaut
      this.fontWeight = '600'; // sinon la font weight par défaut
    }
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
      this.categoryService.getCategorieslist().pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
      .subscribe((categories) => {
        // Je filtre la réception des datas pour n'afficher que les catégories parents
        this.categoriesList = categories.filter(cat => cat.parentId == null);
      }
      )
  }

}
