import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService){};

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

  ngOnInit(): void {
      this.updateForm = this.formBuilder.group({

      })
  }


  deleteAccount() {

  }

  submit() {

  }
}
