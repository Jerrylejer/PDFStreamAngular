import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { createPasswordStrengthValidator } from 'src/utils/passwordSrength';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy{

  updateForm!: FormGroup;

  // ###################### Variables utilisées ######################
  // #### Récupération des datas this.userService.getUserById(id) ####
  // ############## puis valeurs communiquées au Form #################
  username: any = ''; 
  avatar: any = ''; 
  email: any = ''; 
  password: any = ''; 
  bio: any = ''; 
  // Récupéreration de l'id du User connecté et stocké dans le LS
  id = Number(localStorage.getItem("userId"));
  // Subscription
  private userSubscription?: Subscription;

  // Boolean pour rendre la modale visible ou non au click "connexion", "X"
  displayStyle = "none";
  displayDeleteModaleStyle = "none"

  // #################################################################

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router,
    private toast: ToastrService){};

  ngOnInit(): void {
    // Initialisation du formulaire d'update
    this.updateForm = this.formBuilder.group({
      updatedUsername: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      updatedAvatar: [''],
      updatedEmail: ['', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      updatedPassword: ['', [Validators.minLength(12), createPasswordStrengthValidator()]],
      updatedBio: ['']
    })

    // Lecture de l'id user dans le LS
    console.log(this.id)

    // Lancer le service pour récupérer les datas du user dans userSubscription
    this.userSubscription = this.userService.getUserById(this.id).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe(
      // J'accède à la réponse renvoyée par le serveur
      (response) => {
        console.log(response)
        // Avec cette réponse, je peux afficher les datas enregistrées en bdd
        this.username = response.username;
        this.avatar = response.avatar;
        this.email = response.email;
        this.password = response.password;
        this.bio = response.bio;
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe au démontage sinon message d'erreur car .subscribe court toujours
    // et données non disponibles (GET)
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Manipulation des modales
  openUpdateModale() {
    this.displayStyle = "block";
  }

  openDeleteModale() {
    this.displayDeleteModaleStyle = "block";
  }

  closeUpdateModale() {
    this.displayStyle = "none";
  }

  closeDeleteModale() {
    this.displayDeleteModaleStyle = "none";
  }

  // Suppression d'un compte
  deleteAccount() {
    this.userService.deleteUser(this.id).pipe(
      catchError((error) => {
        this.toast.warning("Une erreur est survenue, merci de recommencer !");
        console.log("erreur mon ptit gars!");
        return throwError(() => error);
      }))
      .subscribe(
        (response) => {
          console.log(response, "user supprimé !"),
          this.closeDeleteModale();
          this.authService.deconnexion().pipe(
            catchError((error) => {
              this.toast.warning("Une erreur est survenue, merci de recommencer !");
              console.log("erreur lors de la déconnexion : ", error);
              return throwError(() => error)
            })
            )
            .subscribe(
              () => {
                // Communication de "false" à isConnectedSubject (authService) qui émet alors la nouvelle valeur (pour modif nav header en l'occurence)
                this.authService.setIsConnected(false);
                this.toast.success("Votre compte est supprimé et vous avez été déconnecté(e) ! Nous espérons vous revoir très prochainement sur PDFStream."); 
            this.router.navigate(["/"]);
            // Modification de la valeur pour la clé "isAuthenticated" dans le localStorage + valeurs du user à ''
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('roles');
            // Lancer une requête à une méthode du serviceAuth qui s'occupera d'alterner un booléen suivant si connecté ou pas
            this.ngOnInit();
          }
        )
        }
      )
  }

  // Soumission du formulaire d'update
  updateAccount() {
    if(this.updateForm.valid) {
      const updatedUsername: any = this.updateForm.value.updatedUsername;
      const updatedAvatar: any = this.updateForm.value.updatedAvatar;
      const updatedEmail: any = this.updateForm.value.updatedEmail;
      const updatedPassword: any = this.updateForm.value.updatedPassword;
      const updatedBio: any = this.updateForm.value.updatedBio;
      // Appel à mon service
      this.userService.updateUser(this.id, updatedUsername, updatedAvatar, updatedEmail, updatedPassword, updatedBio).pipe(
        catchError((error) => {
          this.toast.warning("Une erreur est survenue, merci de recommencer !");
          console.log("erreur mon ptit gars!");
          return throwError(() => error);
        })
      )
      .subscribe(
        (response) => {
        this.toast.success("Vos données ont été correctement modifiées !"); 
        console.log(response, "datas modifiées !"),
        this.closeUpdateModale();
        this.ngOnInit();
      }
      )
    } else {
      this.toast.warning("Plusieurs champs nécéssitent votre attention et doivent être corrigés !");
    }
  }
}
