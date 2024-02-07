import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

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
     * Envoi d'une requête http POST pour la création d'un objet de type pdf
     * @param data 
     * @returns 
     */
    uploadPdf(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/pdf/upload`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http UPDATE pour la modification d'un pdf selon son id
     * @param id 
     * @param data 
     * @returns 
     */
    updatePdf(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/pdf/update/${id}`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'un pdf selon son id
     * @param id 
     * @returns 
     */
    deletePdf(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/pdf/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de tous les pdfs
     * @returns 
     */
    getPdfsList(): Observable<Pdf[]> {
      return this.http.get<Pdf[]>(`${this.apiUrl}/pdf`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'un pdf selon son id
     * @param id 
     * @returns 
     */
    getPdfById(id: number): Observable<Pdf> {
      return this.http.get<Pdf>(`${this.apiUrl}/pdf/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
