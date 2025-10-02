import { CanActivate,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root' 
})
export class AuthGuard implements CanActivate
{
   constructor(private authService :AuthService,private router:Router)
   {
   }

     canActivate(): boolean
     {
      if(this.authService.loggedIn())
      {
        return true; // if logged then allow to route
      }else
      {
        this.router.navigate(['/login']); // if not logged in,then redirect to login page
        return false;
      }

     }
     
}