import { Component, input, output } from '@angular/core';
import { Forecast } from '../../interfaces/forecast-list-response';

@Component({
  imports: [],
  selector: 'app-forecast-item-component',
  styleUrl: './forecast-item-component.css',
  templateUrl: './forecast-item-component.html',
})
export class ForecastItemComponent {
  forecast = input<Forecast>();
  editClicked = output<Forecast>();
  deleteClicked = output<Forecast>();

  emitEditClicked() {
    this.editClicked.emit(this.forecast()!);
  }

  emitDeleteClicked() {
    this.deleteClicked.emit(this.forecast()!);
  }
}
