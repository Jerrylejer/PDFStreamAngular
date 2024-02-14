import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pdf-stream-angular';

  constructor(private authService: AuthService){}

    ngOnInit() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated === 'true') {
          // L'utilisateur est connecté
          this.authService.setIsConnected(true);
      } else {
          // L'utilisateur n'est pas connecté
          this.authService.setIsConnected(false);
      }
  }
}
