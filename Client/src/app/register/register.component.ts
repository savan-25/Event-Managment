import { Component, OnInit } from '@angular/core';
import { AbstractControl ,FormBuilder, FormGroup,NgControlStatusGroup,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{
  signupForm !:FormGroup
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private _authService:AuthService){}

  ngOnInit(): void {
      this.signupForm = this.formbuilder.group(
        {
          name:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]],
          mobile:['',[Validators.pattern(/^[0-9]{10}$/)]],
          password:['',[Validators.required,Validators.minLength(6)]]
        }
      )
  }
 get f() :{[key:string]:AbstractControl}{
    return this.signupForm.controls;
  }
  
  onSubmit()
  {
    if(this.signupForm.valid)
    {
      console.log(this.signupForm.value);

        this._authService.registerUser(this.signupForm.value).subscribe
        (
          res =>{
            console.log('User registerd',res);
            alert('signup successful');
            this.signupForm.reset();
            this.router.navigate(['/login']);
          },
           err => {
        if (err.status === 400) {
          alert('User already exists');
        } else {
          alert('Signup failed');
        }
        console.error(err);
      }
        );
    }
  }



}