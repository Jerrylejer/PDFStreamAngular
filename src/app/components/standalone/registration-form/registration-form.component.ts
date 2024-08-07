import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { createPasswordStrengthValidator } from 'src/utils/passwordSrength';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit{
  // ReactiveForms
  inscriptionForm!: FormGroup; 
  // Switch pour icone visibilité password
  isVisible?: boolean = false;
  // Injections 
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toast: ToastrService){}

  
  // Switch pour visibilité password on/off
  toggleVisibility(): void {
  const input = document.getElementById("passwordRegistration") as HTMLElement;
  console.log(input.getAttribute('type'));
  if (input && input instanceof HTMLInputElement) {
      if (input.type === "text") {
          input.type = "password";
          this.isVisible = false;
      } else {
          input.type = "text";
        this.isVisible = true;
      }
  }
}

  // Initialisation du formulaire
  ngOnInit() {
    this.inscriptionForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(12), createPasswordStrengthValidator()]],
    });
  }

  submit() {
    if(this.inscriptionForm.valid) {
      const username = this.inscriptionForm.value.username;
      const email = this.inscriptionForm.value.email;
      const password = this.inscriptionForm.value.password;
      // Appel au service d'inscription
      this.auth.inscription(username, email, password)
        .pipe(
          catchError((error) => {
            // Voir erreur si username existe déjà
            console.log("erreur d'authentification : ", error);
            return throwError(() => error);
          })
        )
        .subscribe(
          (response) => {
            console.log("inscription réussie")
            this.toast.success("Félicitations ! Votre compte est à présent activé. Il ne vous reste plus qu'à vous connecter ! ")
            // Si la connexion est ok, je remets le formulaire à zéro, je ferme ma page et redirige vers l'accueil
            this.inscriptionForm = this.formBuilder.group({
              username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
              // Validators.email ne tient pas compte du .com ...
              email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
              password: ['', [Validators.required, Validators.minLength(12), createPasswordStrengthValidator()]],
            });
            this.router.navigate(['/']);
          }
        );
    }
  }
}
