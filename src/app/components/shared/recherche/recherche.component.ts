import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {
  constructor(private router: Router){}
 // ReactiveForms
 myForm!: FormGroup;
 // Initialisation du formulaire
 ngOnInit() {
   this.myForm = new FormGroup({
     valeur: new FormControl(''),
   });
 }
 // Je récupère la valeur de l'input (2 way bidding)
 terme?: any;
 // Je stocke ma valeur dans le localStorage sous forme de clé-valeur
 // Je redirige à la page de jeu
 // Je réinitialise l'input à la soumission du formulaire
 searchTerm(form: FormGroup) {
   const data: String = this.terme;
   const recherche = JSON.stringify(data);
   localStorage.setItem('terme', recherche);
   this.router.navigate(['']);
   this.terme = '';
 }
}
