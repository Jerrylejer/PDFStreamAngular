import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Donation } from 'src/app/models/donation.model';
import { Pdf } from 'src/app/models/pdf.model';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

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
     * Envoi d'une requête http POST pour la création d'un objet de type donation
     * @param data 
     * @returns 
     */
    saveDonation(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/donation/new`, data).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http DELETE pour la suppression d'une donation selon son id
     * @param id 
     * @returns 
     */
    deleteDonation(id: Donation): Observable<any> {
      return this.http.delete(`${this.apiUrl}/donation/delete/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les donations
     * @returns 
     */
    getDonationsList(): Observable<Donation[]> {
      return this.http.get<Donation[]>(`${this.apiUrl}/donation`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la lecture d'une donation selon son id
     * @param id 
     * @returns 
     */
    getDonationById(id: number): Observable<Donation> {
      return this.http.get<Donation>(`${this.apiUrl}/donation/id/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les donations par donor
     * @param user 
     * @returns 
     */
    getDonationByDonor(donor: User): Observable<Donation[]> {
      return this.http.get<Donation[]>(`${this.apiUrl}/donation/donor/${donor}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les donations par beneficiary
     * @param user 
     * @returns 
     */
        getDonationByBeneficiary(beneficiary: User): Observable<Donation[]> {
          return this.http.get<Donation[]>(`${this.apiUrl}/donation/beneficiary/${beneficiary}`).pipe(
            catchError((error) => {
              return throwError(() => error)
            })
          )
        }

    /**
     * Envoi d'une requête http GET pour la liste de toutes les donations par pdf
     * @param pdf 
     * @returns 
     */
    getDonationByPdf(pdf: Pdf): Observable<Donation[]> {
      return this.http.get<Donation[]>(`${this.apiUrl}/donation/pdf/${pdf}`).pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
