import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environnement } from 'src/env/environnement';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    // url de base pour l'accès à l'API
    private readonly apiUrl = Environnement.pdfStreamApiUrl;
    // Injection du module HttpClient pour la communication http
    constructor(private readonly http: HttpClient) { }
  
    // #########################################################
    // METHODES "MIROIR" ENDPOINTS DE MON BACK API
    // Observable => asynchronicité des données en attente de réception
    // pipe() => ici est utilisé pour canaliser les éventuelles erreurs
    // #########################################################
}
