import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; // Will create later

const routes: Routes = [
  {
    path:'',
    redirectTo:'/events',
    pathMatch:'full'
  },
  {
   path:'events',
   component: EventComponent
  },
  {
    path:'special',
   component: SpecialEventComponent,
   canActivate:[AuthGuard] // here guard is put
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'admission',
    component:AdmissionFormComponent
  },
    { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent }, // Setup later
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }