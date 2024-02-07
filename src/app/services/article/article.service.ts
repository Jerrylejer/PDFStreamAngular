import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

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
     * Envoi d'une requête http POST pour la création d'un objet de type article
     * @param data 
     * @returns 
     */
    saveArticle(data: Article): Observable<any> {
      return this.http.post(`${this.apiUrl}/article/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http UPDATE pour la modification d'un article selon son id
     * @param id 
     * @param data 
     * @returns 
     */
    updateArticle(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/article/update/${id}`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'un article selon son id
     * @param id 
     * @returns 
     */
    deleteArticle(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/article/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de tous les articles
     * @returns 
     */
    getArticlesList(): Observable<Article[]> {
      return this.http.get<Article[]>(`${this.apiUrl}/article`).pipe(
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
    getArticleById(id: number): Observable<Article> {
      return this.http.get<Article>(`${this.apiUrl}/article/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
