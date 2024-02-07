import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';
import { Article } from 'src/app/models/article.model';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

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
   * Envoi d'une requête http POST pour la création d'un objet de type alert
   * @param data 
   * @returns 
   */
  saveAlert(data: Alert): Observable<any> {
    return this.http.post(`${this.apiUrl}/alert/new`, data).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http UPDATE pour la modification d'une alert selon son id
   * @param id 
   * @param data 
   * @returns 
   */
  updateAlert(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/alert/update/${id}`, data).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http DELETE pour la suppression d'une alert selon son id
   * @param id 
   * @returns 
   */
  deleteAlert(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/article/delete/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http GET pour la liste de toutes les alerts
   * @returns 
   */
  getAlertsList(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alert`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http GET pour la lecture d'une alert selon son id
   * @param id 
   * @returns 
   */
  getAlertById(id: number): Observable<Alert> {
    return this.http.get<Alert>(`${this.apiUrl}/alert/id/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

/**
 * Envoi d'une requête http GET pour la liste des alerts par user
 * @param user 
 * @returns 
 */
  getAlertsByUser(user: User): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alert/user/${user}`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http GET pour la liste des alerts par article
   * @param article 
   * @returns 
   */
  getAlertsByArticle(article: Article): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alert/article/${article}`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  /**
   * Envoi d'une requête http GET pour la liste des alerts par pdf
   * @param pdf 
   * @returns 
   */
  getAlertsByPdf(pdf: Pdf): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alert/pdf/${pdf}`).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }
}
