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
    // #############################
    // ETAT DE CONNEXION IV (voir dans authService)
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      // isAuthenticated est modifié au click connexionUser(), logoutUser() // header
      if (isAuthenticated === 'true') {
          // L'utilisateur est connecté
          this.authService.setIsConnected(true);
      } else {
          // L'utilisateur n'est pas connecté
          this.authService.setIsConnected(false);
      }
  }
}
