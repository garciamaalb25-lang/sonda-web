import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Forecast } from '../../interfaces/forecast-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-forecast-modal',
  styleUrl: './forecast-modal.css',
  templateUrl: './forecast-modal.html',
})
export class ForecastModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() forecast: Forecast | undefined;
  forecastSaved = output<Forecast>();

  forecastForm = new FormGroup({
    zoneId: new FormControl(0),
    zoneName: new FormControl(''),
    date: new FormControl(''),
    visibility: new FormControl(0),
    visibilityLevel: new FormControl(''),
    windSpeed: new FormControl(0),
    windDirection: new FormControl(''),
    suitable: new FormControl(false),
  });

  ngOnInit(): void {
    if (this.forecast) {
      this.forecastForm.patchValue(this.forecast);
    }
  }

  formSubmit() {
    this.forecastSaved.emit({ ...this.forecast, ...this.forecastForm.value } as Forecast);
    this.activeModal.close();
  }
}
