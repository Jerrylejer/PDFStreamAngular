import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  //Injections de FormBuilder + AuthService
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router:Router) {};

  // ###################### Variables utilisées ######################
  // Boolean pour rendre la modale visible ou non au click "connexion", "X"
  // [ngStyle]="{'display':displayStyle}
  displayStyle = "none";
  openModale() {
    this.displayStyle = "block";
  }
  closeModale() {
    this.displayStyle = "none";
  }
  // Configuration du message d'erreur si connexion failed
  errorMessage: String = '';
  // Boolean => switcher l'affichage de la nav (connexion/inscription => déconnexion/compte)
  isConnected: boolean = false;
  // ##################################################################

  // Initialisation du formulaire et des critères de validation quant au remplissage des champs
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isLoggedInPersistence();
  }

  // Ne fonctionne pas, je ne récupère rien
  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   changes['isConnected'];
  //   this.auth.authenticatedUsersList().pipe(
  //     catchError((error) => {
  //       console.log("erreur lors de la requête : ", error);
  //       return throwError(() => error);
  //     })
  //   )
  //   .subscribe(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );
  // }

  // Persistence de l'état connecté grâce au LocalStorage
  isLoggedInPersistence() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if(isAuthenticated && isAuthenticated === 'true') {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
  }
  
  // Soumission du formulaire
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
            // Si la connexion est ok, je ferme ma modale et je modifie l'affichage de la nav
            this.displayStyle = "none";
            this.isConnected = true;
            // Modification de la valeur pour la clé "isAuthenticated" dans le localStorage
            localStorage.setItem('isAuthenticated', 'true');
          }
        );
    }
  }

  // Redirection vers la page de compte (mode connecté et au click "compte")
  routerInscription() {
    this.router.navigate(["/inscription"]);
  }
  // Redirection vers la page de compte (mode connecté et au click "compte")
  routerCompte() {
    this.router.navigate(["/compte"]);
  }

  // Click "déconnexion"
  logout() {
    this.auth.deconnexion()
    .pipe(
      catchError((error) => {
        console.log("erreur lors de la déconnexion : ", error);
        return throwError(() => error)
      })
    )
    .subscribe(
      (response) => {
        console.log("Déconnexion réussie")
        // Modification de la valeur pour la clé "isAuthenticated" dans le localStorage
        localStorage.setItem('isAuthenticated', 'false');
        this.isConnected = false;
      }
    )
  }
}
