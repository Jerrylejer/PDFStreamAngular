import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // ReactiveForms
  authForm!: FormGroup;
  //FormBuilder
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {};

  // Initialisation du formulaire
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  // Une props pour le paramétrage des messages d'erreurs à la validation
  errorMessage: String = '';
  
  submit() {
    if(this.authForm.valid) {
      const username = this.authForm.value.username;
      const password = this.authForm.value.password;
      // Appel au service d'authentification
      this.auth.connexion(username, password)
        .pipe(
          catchError((error) => {
            console.log("erreur d'authentification : ", error);
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
            return throwError(() => error);
          })
        )
        .subscribe(
          (response) => {
            console.log("authentification réussie")
            // Si la connexion est ok, je ferme ma modale
            this.displayStyle = "none";
            this.isConnected = true;
          }
        );
    }
  }

  // Boolean pour rendre la modale visible ou non au click "connexion", "X"
  displayStyle = "none";
  // Boolean pour switcher les valeurs de la nav (déconnecté/connecté)
  isConnected: boolean = false;

  openModale() {
    this.displayStyle = "block";
  }

  closeModale() {
    this.displayStyle = "none";
  }
}
