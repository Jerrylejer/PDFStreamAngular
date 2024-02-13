import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
   * Envoi d'une requête http UPDATE pour la mise à jour d'un user
   * @param id 
   * @param data 
   * @returns 
   */

  updateUser(id: number, 
    updatedUsername: string, 
    updatedAvatar: File, 
    updatedEmail: string, 
    updatedPassword: string, 
    updatedBio: string): Observable<any> {
    
    const formData: FormData = new FormData();
    if (updatedUsername !== '') {
      formData.append('username', updatedUsername);
    }
    if (updatedAvatar !== null) {
      formData.append('avatar', updatedAvatar);
    }
    if (updatedEmail !== '') {
      formData.append('email', updatedEmail);
    }
    if (updatedPassword !== '') {
      formData.append('password', updatedPassword);
    }
    if (updatedBio !== '') {
      formData.append('bio', updatedBio);
    }

    return this.http.put(`${this.apiUrl}/user/update/${id}`, formData).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  /**
   * Envoi d'une requête http DELETE pour la suppression d'un user selon son id
   * @param id 
   * @returns 
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  /**
   * Envoi d'une requête http GET pour la liste de tous les users
   * @returns 
   */
  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  /**
   * Envoi d'une requête http GET pour la lecture d'un user selon son id
   * @param id 
   * @returns 
   */
  getUserById(id: number): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      })
    };
    return this.http.get<User>(`${this.apiUrl}/user/single/${id}`, httpOptions).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
}
