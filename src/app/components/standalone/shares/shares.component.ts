import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrl: './shares.component.css'
})
export class SharesComponent implements OnInit{
// Formulaire
pdfForm!: FormGroup;
// Propriété de class qui stocke la liste des pdfs partagés par le user
uploadedPdf?: Pdf[] = []; 
// Récupération de l'id dans le localStorage
id = Number(localStorage.getItem('userId'));

constructor(private pdfService: PdfService,
  private router: Router,
  private formBuilder: FormBuilder,
  private userService: UserService) {}

ngOnInit(): void {
  // Initialisation du formulaire d'update
  this.pdfForm = this.formBuilder.group({
    author: ['', Validators.required],
    smallDescription: ['', Validators.required],
    description: ['', Validators.required],
    pdfFile: ['', Validators.required],
  });
  console.log(this.id);
  // Il faut que je récupère l'objet user 
  this.userService.getUserById(this.id).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  ).subscribe((user) => {
    console.log(user.pdfs);
    this.uploadedPdf = user.pdfs;
  });
}
}

