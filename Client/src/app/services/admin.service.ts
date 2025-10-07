import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Participant{
  name:string;
  email:string;
  event:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  login(admin: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(` ${this.apiUrl}/admin/login`, admin);
  }
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/adminEvents`);
  }

  addEvent(event: { name: string; description: string; Teacher:string,type: string }): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/adminEvents/create`, event);
     
   
  }
  getParticipants():Observable<Participant[]>
  {
    return this.http.get<Participant[]>(` ${this.apiUrl}/adminEvents/getEvent`);
  }

  deleteEvent(eventId: string): Observable<any> {
    const token = localStorage.getItem('adminToken');
    return this.http.delete<any>(`${this.apiUrl}/events/delete${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

   