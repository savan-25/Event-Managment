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

  constructor(
    private fb: FormBuilder,
    private eventService: AdminService,
    private participantService: AdminService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      Teacher: [''],
      type: ['event']
    });
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  submitEvent() {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: () => {
          alert('Event added successfully!');
          this.eventForm.reset({ type: 'event' });
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add event');
        }
      });
    }
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
}