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
 eventForm: FormGroup;
  participants: Participant[] = [];
  events: any[] = []; //List of all events displayed in dashboard
  editingEventId: string | null = null;//Used to track which event is being edited
  isLoading = false; //Boolean flag to show loader during data fetch
   activeSection: string = 'addEvent'; // Helps toggle between different dashboard section

  constructor(
    private fb: FormBuilder,
    private eventService: AdminService,
    private participantService: AdminService
  ) 
    {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      Teacher: ['',Validators.required],
      type: ['event']
    });
  }

  ngOnInit(): void {
    this.loadParticipants();
    this.loadEvents();
  }

  showSection(section: string) {
    this.activeSection = section;
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

  loadParticipants() {
    this.participantService.getParticipants().subscribe({
      next: (data) => {
        this.participants = data;
      },
      error: (err) => {
        console.error('Error loading participants', err);
      }
    });
    
  }
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