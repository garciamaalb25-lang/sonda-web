import { Component, input, output } from '@angular/core';
import { Meetup } from '../../interfaces/meetup-list-response';

@Component({
  imports: [],
  selector: 'app-meetup-item-component',
  styleUrl: './meetup-item-component.css',
  templateUrl: './meetup-item-component.html',
})
export class MeetupItemComponent {
  meetup = input<Meetup>();
  editClicked = output<Meetup>();
  deleteClicked = output<Meetup>();

  emitEditClicked() {
    this.editClicked.emit(this.meetup()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.meetup()!);
  }
}
