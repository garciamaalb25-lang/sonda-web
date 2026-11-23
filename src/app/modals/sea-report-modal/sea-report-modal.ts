import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SeaReport } from '../../interfaces/sea-report-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-sea-report-modal',
  styleUrl: './sea-report-modal.css',
  templateUrl: './sea-report-modal.html',
})
export class SeaReportModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() seaReport: SeaReport | undefined;
  seaReportSaved = output<SeaReport>();

  seaReportForm = new FormGroup({
    zoneId: new FormControl(0),
    spotId: new FormControl(0),
    spotName: new FormControl(''),
    username: new FormControl(''),
    date: new FormControl(''),
    visibility: new FormControl(0),
    waterTemperature: new FormControl(0),
    windDirection: new FormControl(''),
    waveHeight: new FormControl(0),
    comment: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.seaReport) {
      this.seaReportForm.patchValue(this.seaReport);
    }
  }

  formSubmit() {
    this.seaReportSaved.emit({ ...this.seaReport, ...this.seaReportForm.value } as SeaReport);
    this.activeModal.close();
  }
}
