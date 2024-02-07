import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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
     * Envoi d'une requête http POST pour la création d'un objet de type category
     * @param data 
     * @returns 
     */
    saveCategory(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/category/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http UPDATE pour la modification d'une category selon son id
     * @param id 
     * @param data 
     * @returns 
     */
    updateCategory(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/category/update/${id}`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'une category selon son id
     * @param id 
     * @returns 
     */
    deleteCategory(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/category/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les categories
     * @returns 
     */
    getCategorieslist(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.apiUrl}/category`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une category selon son id
     * @param id 
     * @returns 
     */
    getCategoryById(id: number): Observable<Category> {
      return this.http.get<Category>(`${this.apiUrl}/category/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
