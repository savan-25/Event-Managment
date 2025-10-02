import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
   standalone: false,
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  loginUserData = { username: '', password: '' };
  errorMessage = '';

  constructor(private adminService: AdminService, private router: Router) {}

  adminLogin() {
    this.adminService.login(this.loginUserData).subscribe({
      next: (response) => {
        // Store token or user info if needed
       // localStorage.setItem('adminToken', response.token);
        // Redirect to dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}