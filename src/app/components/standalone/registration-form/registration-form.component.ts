import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  // ReactiveForms
  myForm!: FormGroup;
  // Initialisation du formulaire
  ngOnInit() {
    this.myForm = new FormGroup({
      gender: new FormControl('1'),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      adress1: new FormControl(''),
      adress2: new FormControl(''),
      zipcode: new FormControl(''),
      city: new FormControl(''),
      pseudo: new FormControl(''),
      avatar: new FormControl(''),
      email: new FormControl(''),
      confemail: new FormControl(''),
      mdp: new FormControl(''),
      confmdp: new FormControl(''),
      bio: new FormControl('')
    });
  }

  storeFullDatas(form: FormGroup) {

  }
}
