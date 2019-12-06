import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from '../_models/Meeting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5000/api/meeting';

  getAllMeetingsAsync(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseURL);
  }

  GetMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseURL}/${id}`);
  }

  saveMeeting(meeting: Meeting) {
    return this.http.post(`${this.baseURL}`, meeting);
  }

  editMeeting(meeting: Meeting) {
    return this.http.put(`${this.baseURL}/${meeting.id}`, meeting);
  }

  deleteMeeting(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  postUpload(file: File, name: string) {
    const fileToUplaod = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUplaod, name);

    return this.http.post(`${this.baseURL}/upload`, formData);
  }
}
