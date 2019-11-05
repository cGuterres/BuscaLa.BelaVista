import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../_models/Complaint';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  baseURL = 'http://localhost:5000/site/complaint';
  constructor(private http: HttpClient) { }

  getAllCondominiunsAsync(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseURL);
  }

  GetCondominiumById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseURL}/${id}`);
  }
}
