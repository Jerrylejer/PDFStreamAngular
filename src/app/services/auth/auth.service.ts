import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url de base pour l'accès à l'API
  private readonly apiUrl = Environnement.pdfStreamApiUrl;

    // // #############################
    // // ETAT DE CONNEXION I
    // // Objet qui est un Observable mais aussi un "Observateur" (Rxjs)
    // private isConnectedSubject: BehaviorSubject<boolean>;
    // public isConnected$!: Observable<boolean>;

    // constructor(private readonly http: HttpClient) { 
    // // #############################
    // // ETAT DE CONNEXION II
    // // Initialisation des propriétés à false
    //   this.isConnectedSubject = new BehaviorSubject<boolean>(false), 
    //   this.isConnected$ = this.isConnectedSubject.asObservable()
    // }
    // // #############################
    // // ETAT DE CONNEXION III
    // // Déterminer la valeur booléenne pour "isConnected"
    // setIsConnected(value: boolean) {
    //   // next() renvoie la valeur à BehaviorSubject<boolean> qui le diffuse
    //   this.isConnectedSubject.next(value);
    // }
    // // Communiquer la valeur de "isConnected"
    // getIsConnected() {
    //   return this.isConnectedSubject.value;
    // }

  // #############################
  // ETAT CONNEXION I
  //BehaviorSubject => Objet qui est un Observable mais aussi un "Observateur" (Rxjs)
  private isConnectedSubject: BehaviorSubject<boolean>;
  public isConnected$: Observable<boolean>;

  // #############################
  // ETAT CONNEXION II
  // Initialisation des propriétés à false
  constructor(private readonly http: HttpClient) {
    this.isConnectedSubject = new BehaviorSubject<boolean>(false);
    this.isConnected$ = this.isConnectedSubject.asObservable();
    this.isConnectedFromLocalStorage();
  }

  // #############################
  // ETAT DE CONNEXION III
  // Déterminer la valeur booléenne pour "isAuthenticated" dans le LS
  // Pour modifier la valeur de "isConnectedSubject" via setIsConnected()
  private isConnectedFromLocalStorage(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.setIsConnected(true);
    } else {
      this.setIsConnected(false);
    }
  }

  public setIsConnected(value: boolean): void {
    // La valeur true ou false est mise à jour en concordance avec le localStorage
    this.isConnectedSubject.next(value);
  }

  public getIsConnected(): boolean {
    // Valeur de l'état de connexion
    return this.isConnectedSubject.value;
  }
    
    // #########################################################
    // METHODES "MIROIR" ENDPOINTS DE MON BACK API
    // Observable => asynchronicité - en attente du résultat de la requête (datas ou erreur)
    // pipe() => ici est utilisé pour canaliser les éventuelles erreurs
    // #########################################################
    
    /**
     * Envoi d'une requête http POST pour la connexion d'un user
     * @param data 
     * @returns 
     */
    connexion(username: String, password: String): Observable<any> {
      // Content-Type 'text/plain;charset=UTF-8' is not supported] provenant de l'api
      // Il faut préciser dans le Header de la requête, le type de data envoyé vers le back avec l'aide HttpHeaders
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
  
      const body = {
        username: username,
        password: password
      };

      return this.http.post(`${this.apiUrl}/auth/connexion`, body, httpOptions).pipe(
        catchError((error) => {
          return throwError(() => "Il y a une erreur sur l'identifiant ou le mot de passe. Ré-essayez.")
        })
        )
      }
      
    /**
     * Envoi d'une requête http POST pour l'inscription d'un user
     * @param data 
     * @returns 
     */
    inscription(username: String, email: String, password: String): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      const body = {
        username: username,
        email: email,
        password: password
      };
      return this.http.post(`${this.apiUrl}/auth/inscription`, body, httpOptions).pipe(
        catchError((error) => {
          return throwError(() => "Les données récoltées sont incomplêtes ou corrompues. Ré-essayez.")
        })
      )
    }

    /**
     * Envoi d'une requête http POST pour la déconnexion d'un user
     * @returns 
     */
    deconnexion(): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/deconnexion`, {}).pipe(
        catchError((error) => {
          return throwError(() => "Erreur lors de la tentative de déconnexion. Ré-essayez.")
        })
      )
    }

    /**
     * Compare la date de validité du token avec la date actuelle, renvoie un booléen true si exp, false si ok
     * @returns 
     */
    isTokenExpired(): boolean {
      // Récupérer le token du localStorage
      const token = localStorage.getItem('jwtToken');
      // Vérifier si le token est défini
      if (token) {
        // Décoder le token pour obtenir la date d'expiration
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(tokenPayload.exp * 1000); // Convertir en millisecondes
        // Si la date d'expiration est < ou = à aujourd'hui => le token a expiré = true, sinon elle renvoie false.
        return expirationDate <= new Date();
      } else {
        // Si pas de token (expiré) => true
        return true
      }
    }
}
