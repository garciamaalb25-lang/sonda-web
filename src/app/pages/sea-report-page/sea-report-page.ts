import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeaReport } from '../../interfaces/sea-report-list-response';
import { SeaReportService } from '../../services/sea-report-service';
import { SeaReportItemComponent } from '../../components/sea-report-item-component/sea-report-item-component';
import { SeaReportModal } from '../../modals/sea-report-modal/sea-report-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SeaReportItemComponent],
  selector: 'app-sea-report-page',
  styleUrl: './sea-report-page.css',
  templateUrl: './sea-report-page.html',
})
export class SeaReportPage {
  seaReportService = inject(SeaReportService);
  private modalService = inject(NgbModal);

  seaReportList = signal<SeaReport[]>([
    { id: 1, zoneId: 1, spotId: 1, spotName: 'Isla de las Palomas', username: 'pescador_huelva', date: '2026-11-15', visibility: 10, waterTemperature: 18, windDirection: 'PONIENTE', waveHeight: 0.5, comment: 'Agua limpia y mucha vida', createdAt: '2026-11-15' },
    { id: 2, zoneId: 3, spotId: 2, spotName: 'Piedras de Mazagón', username: 'apnea_cadiz', date: '2026-11-14', visibility: 3, waterTemperature: 17, windDirection: 'SUR', waveHeight: 1.2, comment: 'Mar de fondo, poca visibilidad', createdAt: '2026-11-14' },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(SeaReportModal);
    modalRef.componentInstance.seaReportSaved.subscribe((newSeaReport: SeaReport) => {
      newSeaReport.id = Date.now();
      this.seaReportList.set([...this.seaReportList(), newSeaReport]);
    });
  }

  openEditModal(seaReport: SeaReport) {
    const modalRef = this.modalService.open(SeaReportModal);
    modalRef.componentInstance.seaReport = seaReport;
    modalRef.componentInstance.seaReportSaved.subscribe((editedSeaReport: SeaReport) => {
      this.seaReportList.set(this.seaReportList().map(item => item.id === editedSeaReport.id ? editedSeaReport : item));
    });
  }

  openDeleteModal(seaReport: SeaReport) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = seaReport.spotName;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.seaReportList.set(this.seaReportList().filter(item => item.id !== seaReport.id));
      }
    });
  }
}
