import { Component, input, output } from '@angular/core';
import { SeaReport } from '../../interfaces/sea-report-list-response';

@Component({
  imports: [],
  selector: 'app-sea-report-item-component',
  styleUrl: './sea-report-item-component.css',
  templateUrl: './sea-report-item-component.html',
})
export class SeaReportItemComponent {
  seaReport = input<SeaReport>();
  editClicked = output<SeaReport>();
  deleteClicked = output<SeaReport>();

  emitEditClicked() {
    this.editClicked.emit(this.seaReport()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.seaReport()!);
  }
}
