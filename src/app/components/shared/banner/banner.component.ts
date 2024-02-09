import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  constructor(private router: Router){}

  routerInscription() {
    this.router.navigate(['/inscription']);
  }
}
