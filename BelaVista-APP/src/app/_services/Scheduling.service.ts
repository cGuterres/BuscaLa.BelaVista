import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheduling } from '../_models/Scheduling';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5000/api/scheduling';

  getAllSchedulingsAsync(): Observable<Scheduling[]> {
    return this.http.get<Scheduling[]>(this.baseURL);
  }

  GetSchedulingById(id: number): Observable<Scheduling> {
    return this.http.get<Scheduling>(`${this.baseURL}/${id}`);
  }

  saveScheduling(scheduling: Scheduling) {
    return this.http.post(`${this.baseURL}`, scheduling);
  }

  editScheduling(scheduling: Scheduling) {
    return this.http.put(`${this.baseURL}/${scheduling.id}`, scheduling);
  }

  deleteScheduling(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getSchedulingByDate(scheduleDate: string): Observable<Scheduling> {
    return this.http.get<Scheduling>(`${this.baseURL}/getByDate/${scheduleDate}`);
  }
}
