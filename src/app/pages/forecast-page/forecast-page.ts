import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Forecast } from '../../interfaces/forecast-list-response';
import { ForecastService } from '../../services/forecast-service';
import { ForecastItemComponent } from '../../components/forecast-item-component/forecast-item-component';
import { ForecastModal } from '../../modals/forecast-modal/forecast-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [ForecastItemComponent],
  selector: 'app-forecast-page',
  styleUrl: './forecast-page.css',
  templateUrl: './forecast-page.html',
})
export class ForecastPage {
  forecastService = inject(ForecastService);
  private modalService = inject(NgbModal);

  forecastList = signal<Forecast[]>([
    { id: 1, zoneId: 1, zoneName: 'Tarifa', date: '2026-11-20', visibility: 12, visibilityLevel: 'BUENA', windSpeed: 15, windDirection: 'PONIENTE', suitable: true },
    { id: 2, zoneId: 2, zoneName: 'Cabo de Gata', date: '2026-11-20', visibility: 4, visibilityLevel: 'MALA', windSpeed: 40, windDirection: 'LEVANTE', suitable: false },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(ForecastModal);
    modalRef.componentInstance.forecastSaved.subscribe((newForecast: Forecast) => {
      newForecast.id = Date.now();
      this.forecastList.set([...this.forecastList(), newForecast]);
    });
  }

  openEditModal(forecast: Forecast) {
    const modalRef = this.modalService.open(ForecastModal);
    modalRef.componentInstance.forecast = forecast;
    modalRef.componentInstance.forecastSaved.subscribe((editedForecast: Forecast) => {
      this.forecastList.set(this.forecastList().map(item => item.id === editedForecast.id ? editedForecast : item));
    });
  }

  openDeleteModal(forecast: Forecast) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = forecast.zoneName;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.forecastList.set(this.forecastList().filter(item => item.id !== forecast.id));
      }
    });
  }
}
