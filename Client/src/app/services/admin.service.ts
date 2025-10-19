import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, map } from 'rxjs';
export interface Participant{
  name:string;
  email:string;
  event:string;
  eventId: { _id: string; name: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://event-managment-2-w232.onrender.com'; // Change to your backend URL

  constructor(private http: HttpClient) {}
   login(admin: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(` ${this.apiUrl}/admin/login`, admin);
  }
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event/events`);
    
  }

   getSpecialEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event/special-event`);
    
  }
  //combined cell
 getAllEvents() {
    return forkJoin({
      normal: this.getEvents(),
      special: this.getSpecialEvents()
    }).pipe(
      map((response) => {
        // Merge both arrays
        return [...response.normal, ...response.special];
      })
    );
  }
  addEvent(event: { name: string; description: string; Teacher:string,type: string }): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/adminEvents/create`, event);
     
   
  }
  getParticipants():Observable<Participant[]>
  {
    return this.http.get<Participant[]>(` ${this.apiUrl}/adminEvents/getAdmissions`);
  }

  updateEvent(eventId: string, updatedEvent: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/adminEvents/update/${eventId}`, updatedEvent);
}

deleteEvent(eventId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/adminEvents/delete/${eventId}`);
}
}

   