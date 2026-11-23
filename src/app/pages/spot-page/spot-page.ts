import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Spot } from '../../interfaces/spot-list-response';
import { SpotService } from '../../services/spot-service';
import { SpotItemComponent } from '../../components/spot-item-component/spot-item-component';
import { SpotModal } from '../../modals/spot-modal/spot-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [SpotItemComponent],
  selector: 'app-spot-page',
  styleUrl: './spot-page.css',
  templateUrl: './spot-page.html',
})
export class SpotPage {
  spotService = inject(SpotService);
  private modalService = inject(NgbModal);

  spotList = signal<Spot[]>([
    { id: 1, name: 'Isla de las Palomas', zoneId: 1, zoneName: 'Tarifa', latitude: 36.0, longitude: -5.61, bottomType: 'ROCA', minDepth: 3, maxDepth: 18, legalStatus: 'PERMITIDA', validated: true },
    { id: 2, name: 'Piedras de Mazagón', zoneId: 3, zoneName: 'Mazagón', latitude: 37.12, longitude: -6.82, bottomType: 'MIXTO', minDepth: 2, maxDepth: 9, legalStatus: 'PERMITIDA', validated: false },
    { id: 3, name: 'Cala San Pedro', zoneId: 2, zoneName: 'Cabo de Gata', latitude: 36.9, longitude: -1.98, bottomType: 'POSIDONIA', minDepth: 5, maxDepth: 25, legalStatus: 'RESERVA_PROTEGIDA', validated: true },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(SpotModal);
    modalRef.componentInstance.spotSaved.subscribe((newSpot: Spot) => {
      newSpot.id = Date.now();
      this.spotList.set([...this.spotList(), newSpot]);
    });
  }

  openEditModal(spot: Spot) {
    const modalRef = this.modalService.open(SpotModal);
    modalRef.componentInstance.spot = spot;
    modalRef.componentInstance.spotSaved.subscribe((editedSpot: Spot) => {
      this.spotList.set(this.spotList().map(item => item.id === editedSpot.id ? editedSpot : item));
    });
  }

  openDeleteModal(spot: Spot) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = spot.name;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.spotList.set(this.spotList().filter(item => item.id !== spot.id));
      }
    });
  }
}
