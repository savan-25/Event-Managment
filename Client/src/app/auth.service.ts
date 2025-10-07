import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventData } from './event/eventi.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
  
//   private Url = 'http://localhost:3000/api';
//     private EventUrl = 'http://localhost:3000/event';
//   constructor(private http :HttpClient , private _router: Router) { }
   
//   // registering to portal
//   registerUser(user:any)
//   {
//     return this.http.post<any>(`${this.Url}/signup`,user);
//   }
//   //login data
//   loginUser(user : any)
//   {
//      return this.http.post<any>(`${this.Url}/login`,user);
//   }
//   //public end point
//   getEvents() :Observable<EventData[]>
//   {
//     return this.http.get<EventData[]>(`${this.EventUrl}/Events`)
//   }
//   //protected endpoints
//   getSpecialEvents():Observable<EventData[]>
//   {
//     return this.http.get<EventData[]>(`${this.EventUrl}/special-event`);
//   }
  
//   logoutUser() {
//     localStorage.removeItem('token')
//     this._router.navigate(['/events'])
//   }

//   getToken(){
//     return localStorage.getItem('token')
//   }


//   loggedIn():boolean {
//     const token = localStorage.getItem('token');
    
//     return !!token;
//   }

//   submitAdmission(admission:any):Observable<any>
//   {
//     return this.http.post(`${this.Url}/admission`,admission);
//   }
  
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private Url = 'https://event-managment-1-ztxz.onrender.com/api';
  private EventUrl = 'https://event-managment-1-ztxz.onrender.com/event';

  constructor(private http: HttpClient, private _router: Router) { }

  // registering to portal
  registerUser(user: any) {
    return this.http.post<any>(`${this.Url}/signup`, user);
  }

  // login data
  loginUser(user: any) {
    return this.http.post<any>(`${this.Url}/login`, user);
  }

  // public endpoint
  getEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.EventUrl}/Events`);
  }

  // protected endpoint
  getSpecialEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.EventUrl}/special-event`);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  submitAdmission(admission: any): Observable<any> {
    return this.http.post(`${this.Url}/admission`, admission);
  }
}
