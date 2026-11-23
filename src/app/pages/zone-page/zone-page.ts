import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Zone } from '../../interfaces/zone-list-response';
import { ZoneService } from '../../services/zone-service';
import { ZoneItemComponent } from '../../components/zone-item-component/zone-item-component';
import { ZoneModal } from '../../modals/zone-modal/zone-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [ZoneItemComponent],
  selector: 'app-zone-page',
  styleUrl: './zone-page.css',
  templateUrl: './zone-page.html',
})
export class ZonePage {
  zoneService = inject(ZoneService);
  private modalService = inject(NgbModal);

  zoneList = signal<Zone[]>([
    { id: 1, name: 'Tarifa', province: 'Cádiz', latitude: 36.01, longitude: -5.6 },
    { id: 2, name: 'Cabo de Gata', province: 'Almería', latitude: 36.72, longitude: -2.19 },
    { id: 3, name: 'Mazagón', province: 'Huelva', latitude: 37.13, longitude: -6.83 },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(ZoneModal);
    modalRef.componentInstance.zoneSaved.subscribe((newZone: Zone) => {
      newZone.id = Date.now();
      this.zoneList.set([...this.zoneList(), newZone]);
    });
  }

  openEditModal(zone: Zone) {
    const modalRef = this.modalService.open(ZoneModal);
    modalRef.componentInstance.zone = zone;
    modalRef.componentInstance.zoneSaved.subscribe((editedZone: Zone) => {
      this.zoneList.set(this.zoneList().map(item => item.id === editedZone.id ? editedZone : item));
    });
  }

  openDeleteModal(zone: Zone) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = zone.name;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.zoneList.set(this.zoneList().filter(item => item.id !== zone.id));
      }
    });
  }
}
