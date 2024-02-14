import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // url de base pour l'accès à l'API
    private readonly apiUrl = Environnement.pdfStreamApiUrl;

    // #############################
    // ETAT DE CONNEXION I
    // Objet qui est un Observable mais aussi un "Observateur" (Rxjs)
    private isConnectedSubject: BehaviorSubject<boolean>;
    public isConnected$!: Observable<boolean>;

    constructor(private readonly http: HttpClient) { 
    // #############################
    // ETAT DE CONNEXION II
    // Initialisation des propriétés
      this.isConnectedSubject = new BehaviorSubject<boolean>(false), 
      this.isConnected$ = this.isConnectedSubject.asObservable()
    }
    // #############################
    // ETAT DE CONNEXION III
    // Déterminer une valeur booléenne pour "isConnected"
    setIsConnected(value: boolean) {
      // next() renvoie la valeur à BehaviorSubject<boolean> qui le diffuse
      this.isConnectedSubject.next(value);
    }
    // Communiquer la valeur de "isConnected"
    getIsConnected() {
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
     * Envoi d'une requête GET pour obtenir la liste des utilisateurs connectés
     * @returns 
     */
    // authenticatedUsersList(): Observable<any> {
    //   return this.http.get(`${this.apiUrl}/auth/connectedUsers`).pipe(
    //     catchError((error) => {
    //       return throwError(() => "Erreur lors de la réponse à la requête. Ré-essayez.")
    //     })
    //   )
    // }
}
