import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { createPasswordStrengthValidator } from 'src/utils/passwordSrength';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  updateForm!: FormGroup;

  // ###################### Variables utilisées ######################
  // #### Récupération des datas this.userService.getUserById(id) ####
  // ############## puis valeurs communiqués au Form #################
  username: any = ''; 
  avatar: any = ''; 
  email: any = ''; 
  password: any = ''; 
  bio: any = ''; 
  // Boolean pour rendre la modale visible ou non au click "connexion", "X"
  displayStyle = "none";
  // #################################################################

  constructor(private formBuilder: FormBuilder, private userService: UserService){};

  ngOnInit(): void {
    // Initialisation du formulaire d'update
    this.updateForm = this.formBuilder.group({
      updatedUsername: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      updatedAvatar: ['', Validators.required],
      updatedEmail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      updatedPassword: ['', [Validators.required, Validators.minLength(12), createPasswordStrengthValidator()]],
      updatedBio: ['', Validators.required]
    })
    // Récupérer l'idUser stocké dans le LS
    const id = Number(localStorage.getItem("userId"));
    console.log(id)
    // Lancer le service pour récupérer les datas du user
    this.userService.getUserById(id).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe(
      // J'accède à la réponse renvoyée par le serveur
      (response) => {
        console.log(response)
        // Dans cette réponse, je peux récupérer certaines datas du user connecté
        this.username = response.username;
        this.avatar = response.avatar;
        this.email = response.email;
        this.password = response.password;
        this.bio = response.bio;
        console.log(this.username)
        console.log(this.avatar)
        console.log(this.email)
        console.log(this.password)
        console.log(this.bio)
        }
    )
  }

  // Modale Modification des datas User
  openModale() {
    this.displayStyle = "block";
  }

  closeModale() {
    this.displayStyle = "none";
  }

  // Suppression du compte
  deleteAccount() {

  }

  // Soumission du formulaire d'update
  submit() {

  }
}
