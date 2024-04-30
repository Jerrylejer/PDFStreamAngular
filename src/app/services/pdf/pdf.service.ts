import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
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
    uploadPdf(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/pdf/upload`, formData).pipe(
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
    downloadPdf(id: number): Observable<HttpResponse<Blob>> {
      return this.http.get(`${this.apiUrl}/pdf/download/${id}`, {
        responseType: 'blob',
        observe: 'response'
      }).pipe(
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
    updatePdf(pdfId: number, formData: FormData): Observable<any> {
      return this.http.put(`${this.apiUrl}/pdf/update/${pdfId}`, formData).pipe(
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

    /**
     * Envoi d'une requête http GET pour la lecture d'un pdf selon son id 
     * + la lecture d'une image de preview pour affichage
     * @param id 
     * @returns 
     */
    getPdfAndPreview(id: number): Observable<any> {
      const pdfDetails$ = this.http.get<Pdf>(`${this.apiUrl}/pdf/id/${id}`);
      const pdfPreview$ = this.http.get(`${this.apiUrl}/pdf/preview/${id}`, { responseType : 'blob' });   
      // forkJoin me permet de marier 2 requêtes dans une
      return forkJoin([pdfDetails$, pdfPreview$])
      .pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
      .pipe(
        map(([pdfDetails, pdfPreview]) => {
          return {
            pdfDetails : pdfDetails,
            pdfPreview : pdfPreview
          }
        })
      )
    }

        /**
     * Envoi d'une requête http GET pour la liste de tous les pdfs par auteur
     * @param id 
     * @returns 
     */
        getPdfsListByAuthor(id: User): Observable<Pdf[]> {
          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': 'http://localhost:4200',
            })
          };
          return this.http.get<Pdf[]>(`${this.apiUrl}/pdf/author/${id}`, httpOptions).pipe(
            catchError((error) => {
              return throwError(() => error)
            })
          )
        }
}
