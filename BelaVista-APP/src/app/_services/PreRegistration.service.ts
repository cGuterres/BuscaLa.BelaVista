import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreRegistration } from '../_models/PreRegistration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreRegistrationService {
  baseURL = 'http://localhost:5000/api/preregistration/';
constructor(private http: HttpClient) { }

GetPreRegistration(cpf: string, ap: string): Observable<PreRegistration> {
    return this.http.get<PreRegistration>(`${this.baseURL}${cpf}/${ap}`);
  }
}
