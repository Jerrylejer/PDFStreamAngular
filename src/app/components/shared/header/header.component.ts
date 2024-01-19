import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    // ReactiveForms
    myForm!: FormGroup;
    // Initialisation du formulaire
    ngOnInit() {
      this.myForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
      });
    }
  
    submit(form: FormGroup) {
  
    }

  // Boolean pour rendre la modale visible ou non
  displayStyle = "none";

  openModale() {
    this.displayStyle = "block";
  }

  closeModale() {
    this.displayStyle = "none";
  }
}
