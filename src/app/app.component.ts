import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pdf-stream';

  constructor(private authService: AuthService, private router: Router){}

    ngOnInit() {
    // #############################
    // Vérification de l'expiration du token
    if (this.authService.isTokenExpired()) {
      // Effacer le token du localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('isAuthenticated');
      // L'utilisateur n'est plus considéré comme connecté
      this.authService.setIsConnected(false);
      // Retour page home
      this.router.navigate(["/"]);
    }

    // ETAT DE CONNEXION IV (voir dans authService)
      // const isAuthenticated = localStorage.getItem('isAuthenticated');
      // // isAuthenticated est modifié au click connexionUser(), logoutUser() // header
      // if (isAuthenticated === 'true') {
      //     // L'utilisateur est connecté
      //     this.authService.setIsConnected(true);
      // } else {
      //     // L'utilisateur n'est pas connecté
      //     this.authService.setIsConnected(false);
      // }
  }
}
