import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Meetup } from '../../interfaces/meetup-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-meetup-modal',
  styleUrl: './meetup-modal.css',
  templateUrl: './meetup-modal.html',
})
export class MeetupModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() meetup: Meetup | undefined;
  meetupSaved = output<Meetup>();

  meetupForm = new FormGroup({
    title: new FormControl(''),
    spotId: new FormControl(0),
    spotName: new FormControl(''),
    zoneName: new FormControl(''),
    dateTime: new FormControl(''),
    maxParticipants: new FormControl(0),
    currentParticipants: new FormControl(0),
    minLevel: new FormControl(''),
    status: new FormControl(''),
    organizer: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.meetup) {
      this.meetupForm.patchValue(this.meetup);
    }
  }

  formSubmit() {
    this.meetupSaved.emit({ ...this.meetup, ...this.meetupForm.value } as Meetup);
    this.activeModal.close();
  }
}
