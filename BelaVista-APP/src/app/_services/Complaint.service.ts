import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../_models/Complaint';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  baseURL = 'http://localhost:5000/api/complaint';
  constructor(private http: HttpClient) { }

  getAllComplaintsAsync(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseURL);
  }

  GetComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseURL}/${id}`);
  }

  saveComplaint(complaint: Complaint) {
    return this.http.post(`${this.baseURL}`, complaint);
  }

  editComplaint(complaint: Complaint) {
    return this.http.put(`${this.baseURL}/${complaint.id}`, complaint);
  }

  deleteComplaint(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
