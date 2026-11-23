import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from '../../interfaces/ad-list-response';
import { AdService } from '../../services/ad-service';
import { AdItemComponent } from '../../components/ad-item-component/ad-item-component';
import { AdModal } from '../../modals/ad-modal/ad-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [AdItemComponent],
  selector: 'app-ad-page',
  styleUrl: './ad-page.css',
  templateUrl: './ad-page.html',
})
export class AdPage {
  adService = inject(AdService);
  private modalService = inject(NgbModal);

  adList = signal<Ad[]>([
    { id: 1, title: 'Fusil Cressi 90', category: 'FUSIL', price: 120, condition: 'COMO_NUEVO', city: 'Huelva', mainPhotoUrl: '', status: 'PUBLICADO', createdAt: '2026-11-02' },
    { id: 2, title: 'Traje 7mm talla L', category: 'TRAJE', price: 80, condition: 'USADO', city: 'Cádiz', mainPhotoUrl: '', status: 'PENDIENTE', createdAt: '2026-11-10' },
    { id: 3, title: 'Aletas de carbono', category: 'ALETAS', price: 150, condition: 'NUEVO', city: 'Málaga', mainPhotoUrl: '', status: 'VENDIDO', createdAt: '2026-10-21' },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(AdModal);
    modalRef.componentInstance.adSaved.subscribe((newAd: Ad) => {
      newAd.id = Date.now();
      this.adList.set([...this.adList(), newAd]);
    });
  }

  openEditModal(ad: Ad) {
    const modalRef = this.modalService.open(AdModal);
    modalRef.componentInstance.ad = ad;
    modalRef.componentInstance.adSaved.subscribe((editedAd: Ad) => {
      this.adList.set(this.adList().map(item => item.id === editedAd.id ? editedAd : item));
    });
  }

  openDeleteModal(ad: Ad) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = ad.title;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adList.set(this.adList().filter(item => item.id !== ad.id));
      }
    });
  }
}
