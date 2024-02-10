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

  constructor(private formBuilder: FormBuilder, private userService: UserService){};

  ngOnInit(): void {
    // Récupérer l'idUser stocké dans le LS
    const userId= Number(localStorage.getItem("userId"));
    console.log(userId)
    // Lancer le service pour récupérer les datas du user
    this.userService.getUserById(userId).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe(
      // J'accède à la réponse renvoyée par le serveur
      (response) => {
        console.log("datas renvoyées")
        // Dans cette réponse, je peux récupérer certaines datas du user connecté
          const username = response.username;
          console.log(username)
          const avatar = response.avatar;
          console.log(avatar)
          const email = response.email;
          console.log(email)
          const password = response.password;
          console.log(password)
          const bio = response.bio;
          console.log(bio)
        }
    )
  }

  // ###################### Variables utilisées ######################
  // Boolean pour rendre la modale visible ou non au click "connexion", "X"
  displayStyle = "none";

  openModale() {
    this.displayStyle = "block";
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      avatar: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(12), createPasswordStrengthValidator()]],
      bio: ['', Validators.required]
    })
  }

  closeModale() {
    this.displayStyle = "none";
  }

  deleteAccount() {

  }

  submit() {

  }
}
