import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Evaluation } from 'src/app/models/evaluation.model';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

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
     * Envoi d'une requête http POST pour la création d'un objet de type evaluation
     * @param data 
     * @returns 
     */
    saveEvaluation(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/evaluation/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http UPDATE pour la modification d'une évaluation selon son id
     * @param id 
     * @param data 
     * @returns 
     */
    updateEvaluation(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/evaluation/update/${id}`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'une évaluation selon son id
     * @param id 
     * @returns 
     */
    deleteEvaluation(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/evaluation/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les évaluations
     * @returns 
     */
    getEvaluationsList(): Observable<Evaluation[]> {
      return this.http.get<Evaluation[]>(`${this.apiUrl}/evaluation`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une évaluation selon son id
     * @param id 
     * @returns 
     */
    getEvaluationById(id: number): Observable<Evaluation> {
      return this.http.get<Evaluation>(`${this.apiUrl}/evaluation/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les évaluations par user
     * @param user 
     * @returns 
     */
    getEvaluationsByUser(user: User): Observable<Evaluation[]> {
      return this.http.get<Evaluation[]>(`${this.apiUrl}/evaluation/user/${user}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les évaluations par pdf
     * @param pdf 
     * @returns 
     */
    getEvaluationsByPdf(pdf: Pdf): Observable<Evaluation[]> {
      return this.http.get<Evaluation[]>(`${this.apiUrl}/evaluation/pdf/${pdf}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
