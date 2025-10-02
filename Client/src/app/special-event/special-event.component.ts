import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventData } from '../event/eventi.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-special-event',
  standalone:false,
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {
  specialEvents: EventData[] = [];
  selectedEvent: any = null;

  admissionForm: FormGroup;

  constructor(
    private _eventService: AuthService,
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.admissionForm = this.formbuilder.group({
      studentName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      eventId: ['']
    });
  }

  goToAdmission(event: any) {
    this.router.navigate(['/admission'], { state: { selectedEvent: event } });
  }

  openAdmissionModal(event: any) {
    this.selectedEvent = event;
    const modalElement = document.getElementById('admissionModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  submitAdmission() {
    this.admissionForm.patchValue({ eventId: this.selectedEvent._id });

    this._eventService.submitAdmission(this.admissionForm.value).subscribe({
      next: (res) => {
        alert('Admission submitted successfully!');
        this.selectedEvent = null;
        this.admissionForm.reset();
      },
      error: (err) => {
        alert('Error submitting admission.');
      }
    });
  }

  ngOnInit() {
    this._eventService.getSpecialEvents().subscribe(
      (res: EventData[]) => this.specialEvents = res,
      err => console.log(err)
    );
  }
}