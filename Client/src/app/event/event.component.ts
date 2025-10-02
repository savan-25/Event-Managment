import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventData } from './eventi.component';
import { FormControl,FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var bootstrap: any; // allows Bootstrap JS to be used
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  standalone : false
})
export class EventComponent implements OnInit 
{  
  constructor(private _eventService:AuthService,private http:HttpClient,private formbuilder:FormBuilder,private router:Router) { }
  events : EventData[] = []
  selectedEvent:any=null;

  goToAdmission(event:any)
  {
    this.router.navigate(['/admission'],{state:{selectedEvent:event}});
  }

  admission = {
    studentName :'',
    email:'',
    phone:'',
    eventId:''

  };


openAdmissionModal(event: any) {
  this.selectedEvent = event;
  const modalElement = document.getElementById('admissionModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

  
  submitAdmission()
  {
    this.admission.eventId = this.selectedEvent._id;

    this._eventService.submitAdmission(this.admission).subscribe({
    next: (res) => {
      alert("Admission submitted successfully!");
      this.selectedEvent = null;
      this.admission = { studentName: '', email: '', phone: '', eventId: '' };
    },
    error: (err) => {
      alert("Error submitting admission.");
    }
  });
  }
  ngOnInit() 
  {
    this._eventService.getEvents()
      .subscribe(
         (res: EventData[]) => this.events = res,
        err => console.log(err)
        
      );
  }
}