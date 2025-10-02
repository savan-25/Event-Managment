import { Component,OnInit,Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admission-form',
  standalone: false,
  
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.css'
})
export class AdmissionFormComponent implements OnInit{
   
  @Input() selectedEvent:any;
  @Output() formSubmitted = new EventEmitter<any>();

  admissionForm !:FormGroup
  constructor(private http:HttpClient,private _authService:AuthService,private formbuilder:FormBuilder){}
 

   ngOnInit(): void {
       this.admissionForm = this.formbuilder.group(
        {
          name:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]],
          phone:['',[Validators.required ,Validators.pattern(/^[0-9]{10}$/)]]
        }
       )
   }
   onSubmit()
   {
    if(this.admissionForm.valid)
    {
      const formData = {
        ...this.admissionForm.value,
        eventId:this.selectedEvent?._id || null
      };
    this._authService.submitAdmission(formData).subscribe({
      next: (res) => {
        alert("Admission submitted successfully!");
        this.formSubmitted.emit(formData); // emit if parent is listening
        this.admissionForm.reset();
      },
      error: (err) => {
        alert("Error submitting admission.");
      }
    });

    }
   }

}