import { Component, OnInit } from '@angular/core';
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
  isConnectedUser?: boolean;

  // Récupération du username renvoyé dans le body de la réponse à la demende de connexion
  username: any = localStorage.getItem('username');
  // ##################################################################

  // Initialisation du formulaire et des critères de validation quant au remplissage des champs
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // #############################
    // ETAT DE CONNEXION IV (voir dans authService)
    // Communication de la valeur de "isConnected$ (Observable dans authService) à "isConnected => " 
    // Puis affectation de la valeur de "isConnected => " à "this.isConnectedUser"
    this.auth.isConnected$.subscribe(isConnected => {
      this.isConnectedUser = isConnected;
    });
  }
  
  // Soumission du formulaire d'authentification
  connexionUser() {
    if(this.authForm.valid) {
      const username = this.authForm.value.username;
      const password = this.authForm.value.password;
      // Appel au service d'authentification
      this.auth.connexion(username, password)
        .pipe(
          catchError((error) => {
            console.log("erreur d'authentification : ", error);
            //this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
            alert("Username ou mot de passe incorrect. Merci de revalider vos données de connexion.");
            return throwError(() => error);
          })
        )
        .subscribe(
          // J'accède à la réponse renvoyée par le serveur
          (response) => {
            console.log("authentification réussie")
            // Si la connexion est ok, je ferme ma modale et je modifie l'affichage de la nav
            this.displayStyle = "none";
            // Mettre à jour l'état de connexion
            this.auth.setIsConnected(true);
            // Je conditionne l'état de isConnected
            if(this.auth.getIsConnected() == true) {
              this.isConnectedUser == true;
            } else {
              this.isConnectedUser == false;
            }
            // Dans cette réponse, je peux récupérer certaines datas du user connecté
            if(response.accessToken) {
              const jwtToken = response.accessToken;
              const userId = response.id;
              const username = response.username;
              const userRoles = response.roles;
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('jwtToken', jwtToken);
              localStorage.setItem('userId', userId);
              localStorage.setItem('username', username);
              localStorage.setItem('roles', userRoles);
            }
          }
        );
    }
  }

  // Redirection vers la page de compte (mode connecté et au click "compte")
  routerInscription() {
    this.router.navigate(["/inscription"]);
  }
  // Redirection vers la page des paramétrages (mode connecté et au click "compte")
  routerDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  // Click "déconnexion"
  logoutUser() {
    this.auth.deconnexion()
    .pipe(
      catchError((error) => {
        console.log("erreur lors de la déconnexion : ", error);
        return throwError(() => error)
      })
    )
    .subscribe(
      (response) => {
        alert("Déconnexion réussie")
        // Mettre à jour l'état de connexion
        this.auth.setIsConnected(false);
        this.router.navigate(["/"]);
        // Modification de la valeur pour la clé "isAuthenticated" dans le localStorage + valeurs du user à ''
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
        // Je vide les inputs du formulaire
        this.authForm.value.username = '';
        this.authForm.value.password = '';
        // Je modifie l'état de connexion à false
        this.isConnectedUser = false;
        this.ngOnInit();
      }
    )
  }
}
