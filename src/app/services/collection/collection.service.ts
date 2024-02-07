import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

    // url de base pour l'accès à l'API
    private readonly apiUrl = Environnement.pdfStreamApiUrl;
    // Injection du module HttpClient pour l'utilisation des requêtes http
    constructor(private readonly http: HttpClient) { }
  
    // #########################################################
    // METHODES "MIROIR" ENDPOINTS DE MON BACK API
    // Observable => asynchronicité - en attente du résultat de la requête (datas ou erreur)
    // pipe() => ici est utilisé pour canaliser les éventuelles erreurs
    // #########################################################

    /**
     * Envoi d'une requête http POST pour la création d'un objet de type collection
     * @param data 
     * @returns 
     */
    saveCollection(data: Collection): Observable<any> {
      return this.http.post(`${this.apiUrl}/collection/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http UPDATE pour la modification d'une collection selon son id
     * @param id 
     * @param data 
     * @returns 
     */
    updateCollection(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/collection/update/${id}`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'une collection selon son id
     * @param id 
     * @returns 
     */
    deleteCollection(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/collection/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les collections
     * @returns 
     */
    getCollectionsList(): Observable<Collection[]> {
      return this.http.get<Collection[]>(`${this.apiUrl}/collection`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une collection selon son id
     * @param id 
     * @returns 
     */
    getCollectionById(id: number): Observable<Collection> {
      return this.http.get<Collection>(`${this.apiUrl}/collection/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     *  Envoi d'une requête http GET pour la lecture d'une collection selon son user
     * @param user 
     * @returns 
     */
    getCollectionsByUser(user: User): Observable<Collection[]> {
      return this.http.get<Collection[]>(`${this.apiUrl}/collection/user/${user}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

}
