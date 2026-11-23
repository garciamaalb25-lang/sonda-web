import { Component, input, output } from '@angular/core';
import { Spot } from '../../interfaces/spot-list-response';

@Component({
  imports: [],
  selector: 'app-spot-item-component',
  styleUrl: './spot-item-component.css',
  templateUrl: './spot-item-component.html',
})
export class SpotItemComponent {
  spot = input<Spot>();
  editClicked = output<Spot>();
  deleteClicked = output<Spot>();

  emitEditClicked() {
    this.editClicked.emit(this.spot()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.spot()!);
  }
}
