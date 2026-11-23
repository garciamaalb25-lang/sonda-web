import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { License } from '../../interfaces/license-list-response';
import { LicenseService } from '../../services/license-service';
import { LicenseItemComponent } from '../../components/license-item-component/license-item-component';
import { LicenseModal } from '../../modals/license-modal/license-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [LicenseItemComponent],
  selector: 'app-license-page',
  styleUrl: './license-page.css',
  templateUrl: './license-page.html',
})
export class LicensePage {
  licenseService = inject(LicenseService);
  private modalService = inject(NgbModal);

  licenseList = signal<License[]>([
    { id: 1, userId: 1, number: 'AND-2026-0451', type: 'Pesca submarina', region: 'Andalucía', issueDate: '2026-01-15', expirationDate: '2028-01-15', valid: true },
    { id: 2, userId: 2, number: 'AND-2024-1290', type: 'Pesca submarina', region: 'Andalucía', issueDate: '2024-05-02', expirationDate: '2026-05-02', valid: false },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(LicenseModal);
    modalRef.componentInstance.licenseSaved.subscribe((newLicense: License) => {
      newLicense.id = Date.now();
      this.licenseList.set([...this.licenseList(), newLicense]);
    });
  }

  openEditModal(license: License) {
    const modalRef = this.modalService.open(LicenseModal);
    modalRef.componentInstance.license = license;
    modalRef.componentInstance.licenseSaved.subscribe((editedLicense: License) => {
      this.licenseList.set(this.licenseList().map(item => item.id === editedLicense.id ? editedLicense : item));
    });
  }

  openDeleteModal(license: License) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = license.number;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.licenseList.set(this.licenseList().filter(item => item.id !== license.id));
      }
    });
  }
}
