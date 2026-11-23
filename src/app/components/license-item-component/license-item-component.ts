import { Component, input, output } from '@angular/core';
import { License } from '../../interfaces/license-list-response';

@Component({
  imports: [],
  selector: 'app-license-item-component',
  styleUrl: './license-item-component.css',
  templateUrl: './license-item-component.html',
})
export class LicenseItemComponent {
  license = input<License>();
  editClicked = output<License>();
  deleteClicked = output<License>();

  emitEditClicked() {
    this.editClicked.emit(this.license()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.license()!);
  }
}
