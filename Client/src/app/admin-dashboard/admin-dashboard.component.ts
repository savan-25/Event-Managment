import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService,Participant } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-dashboard',
   standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 
  eventForm: FormGroup; //Holds form fields for adding/editing events
  participants: Participant[] = [];//List of participants fetched from backend
  events: any[] = []; //List of all events displayed in dashboard
  editingEventId: string | null = null;//Used to track which event is being edited
  isLoading = false; //Boolean flag to show loader during data fetch
   activeSection: string = 'addEvent'; // Helps toggle between different dashboard sections

  constructor(
    private fb: FormBuilder,
    private eventService: AdminService,
  ) 
  {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      Teacher: ['',Validators.required],
      type: ['event']
    });
  }

  // Runs Automatically when component is loads

  ngOnInit(): void {
    // fetchs all the participant ,events from backend service
    this.eventService.getParticipants().subscribe({
      next: (res) => this.participants = res,
      error: (err) => console.error('Error fetching participants:', err)
    });
    this.eventService.getAllEvents().subscribe({//subscribe() listens to the HTTP observable and handles success/error.
      next: (data) => (this.events = data),
      error: (err) => console.error(err)
    });
  }

  // it is used to refresh the events list
  loadEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => (this.events = data),
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  submitEvent() {
    if (this.eventForm.valid) {
      if (this.editingEventId) {
        // update event
        this.eventService.updateEvent(this.editingEventId, this.eventForm.value).subscribe({
          next: () => {
            alert('Event updated successfully!');
            this.editingEventId = null;
            //reset the form
            this.eventForm.reset({ type: 'event' });
            this.loadEvents();
          },
          error: (err) => console.error(err)
        });
      } else {
        //add new event
        this.eventService.addEvent(this.eventForm.value).subscribe({
          next: () => {
            alert('Event added successfully!');
            this.eventForm.reset({ type: 'event' });
            this.loadEvents();
          },
          error: (err) => console.error(err)
        });
      }
    }
  }


  showSection(section: string) {
    this.activeSection = section;
  }

  // rest of your existing code (eventForm, participants, etc.)

  
  // whenever admin click on edit button the selected event data is loaded into the form for editing
  //Uses patchValue() so the existing event values appear in the form.
  editEvent(event: any) {
    this.editingEventId = event._id;
    this.eventForm.patchValue(event);
  }
 

  deleteEvent(id: string) {
    // confirm with admin deleting
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          alert('Event deleted successfully!');
          this.loadEvents();
        },
        error: (err) => console.error(err)
      });
    }
  }
}