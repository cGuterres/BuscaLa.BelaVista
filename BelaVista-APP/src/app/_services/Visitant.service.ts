import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visitant } from '../_models/Visitant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitantService {

constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5000/api/visitant';

  getAllVisitantsAsync(): Observable<Visitant[]> {
    return this.http.get<Visitant[]>(this.baseURL);
  }

  GetVisitantById(id: number): Observable<Visitant> {
    return this.http.get<Visitant>(`${this.baseURL}/${id}`);
  }

  saveVisitant(visitant: Visitant) {
    return this.http.post(`${this.baseURL}`, visitant);
  }

  editVisitant(visitant: Visitant) {
    return this.http.put(`${this.baseURL}/${visitant.id}`, visitant);
  }

  deleteVisitant(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
