import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warning } from '../_models/Warning';

@Injectable({
  providedIn: 'root'
})
export class WarningService {

constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5000/api/warning';

  getAllWarningsAsync(): Observable<Warning[]> {
    return this.http.get<Warning[]>(this.baseURL);
  }

  GetWarningById(id: number): Observable<Warning> {
    return this.http.get<Warning>(`${this.baseURL}/${id}`);
  }

  saveWarning(warning: Warning) {
    return this.http.post(`${this.baseURL}`, warning);
  }

  editWarning(warning: Warning) {
    return this.http.put(`${this.baseURL}/${warning.id}`, warning);
  }

  deleteWarning(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
