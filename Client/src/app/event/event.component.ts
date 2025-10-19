import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventData } from './eventi.component';
//import { FormControl,FormBuilder,FormGroup } from '@angular/forms';
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
  constructor(private _eventService:AuthService,private http:HttpClient,private router:Router) { }
  events : EventData[] = []
  selectedEvent:any=null;
  
  //✅ Correct — this passes the event object to another route using state.
  goToAdmission(event:any)
  {
    this.router.navigate(['/admission'],{state:{selectedEvent:event}});
  }
  openAdmissionModal(event: any) {
    this.selectedEvent = event;
    const modalElement = document.getElementById('admissionModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  onFormSubmitted(data: any) {
    alert("Form is submitted");
  console.log('Admission Form Data:', data);
  this.selectedEvent = null;
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