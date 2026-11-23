import { Component, input, output } from '@angular/core';
import { Ad } from '../../interfaces/ad-list-response';

@Component({
  imports: [],
  selector: 'app-ad-item-component',
  styleUrl: './ad-item-component.css',
  templateUrl: './ad-item-component.html',
})
export class AdItemComponent {
  ad = input<Ad>();
  editClicked = output<Ad>();
  deleteClicked = output<Ad>();

  emitEditClicked() {
    this.editClicked.emit(this.ad()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.ad()!);
  }
}
