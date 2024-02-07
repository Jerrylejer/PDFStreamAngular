import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Search } from 'src/app/models/search.model';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    // url de base pour l'accès à l'API
    private readonly apiUrl = Environnement.pdfStreamApiUrl;
    // Injection du module HttpClient pour la communication http
    constructor(private readonly http: HttpClient) { }
  
    // #########################################################
    // METHODES "MIROIR" ENDPOINTS DE MON BACK API
    // Observable => asynchronicité - en attente du résultat de la requête (datas ou erreur)
    // pipe() => ici est utilisé pour canaliser les éventuelles erreurs
    // #########################################################

    /**
     * Envoi d'une requête http POST pour la création d'un objet de type Search
     * @param data 
     * @returns 
     */
    saveSearch(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/search/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'un search selon son id
     * @param id 
     * @returns 
     */
    deleteSearch(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/search/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les searches
     * @returns 
     */
    getSearchesList(): Observable<Search[]> {
      return this.http.get<Search[]>(`${this.apiUrl}/search`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une search selon son id
     * @param id 
     * @returns 
     */
    getSearchById(id: number): Observable<Search> {
      return this.http.get<Search>(`${this.apiUrl}/search/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une search selon son userId
     * @param user 
     * @returns 
     */
    getSearchByUser(user: User): Observable<Search> {
      return this.http.get<Search>(`${this.apiUrl}/search/user/${user}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
