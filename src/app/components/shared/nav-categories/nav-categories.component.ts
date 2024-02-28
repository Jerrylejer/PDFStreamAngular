import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrl: './nav-categories.component.css'
})
export class NavCategoriesComponent {
  color = '#3e515b'; // Couleur de font par défaut
  fontWeight = "600"; // font-weight par défaut

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
}
