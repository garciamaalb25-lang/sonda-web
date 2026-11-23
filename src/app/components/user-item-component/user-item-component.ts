import { Component, input, output } from '@angular/core';
import { User } from '../../interfaces/user-list-response';

@Component({
  imports: [],
  selector: 'app-user-item-component',
  styleUrl: './user-item-component.css',
  templateUrl: './user-item-component.html',
})
export class UserItemComponent {
  user = input<User>();
  editClicked = output<User>();
  deleteClicked = output<User>();

  emitEditClicked() {
    this.editClicked.emit(this.user()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.user()!);
  }
}
