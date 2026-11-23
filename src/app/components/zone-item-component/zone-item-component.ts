import { Component, input, output } from '@angular/core';
import { Zone } from '../../interfaces/zone-list-response';

@Component({
  imports: [],
  selector: 'app-zone-item-component',
  styleUrl: './zone-item-component.css',
  templateUrl: './zone-item-component.html',
})
export class ZoneItemComponent {
  zone = input<Zone>();
  editClicked = output<Zone>();
  deleteClicked = output<Zone>();

  emitEditClicked() {
    this.editClicked.emit(this.zone()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.zone()!);
  }
}
