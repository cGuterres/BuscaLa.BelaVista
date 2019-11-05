import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condominium } from '../_models/Condominium';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {
  baseURL = 'http://localhost:5000/site/condominium';

  constructor(private http: HttpClient) {}

  getAllCondominiunsAsync(): Observable<Condominium[]> {
    return this.http.get<Condominium[]>(this.baseURL);
  }

  GetCondominiumById(id: number): Observable<Condominium> {
    return this.http.get<Condominium>(`${this.baseURL}/${id}`);
  }

  getAllCondominiunsByName(name: string): Observable<Condominium[]>{
    return this.http.get<Condominium[]>(`${this.baseURL}/getByName/${name}`);
  }

  saveCondominiun(condominium: Condominium) {
    return this.http.post(`${this.baseURL}`, condominium);
  }

  editCondominiun(condominium: Condominium) {
    return this.http.put(`${this.baseURL}/${condominium.id}`, condominium);
  }

  deleteCondominiun(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
