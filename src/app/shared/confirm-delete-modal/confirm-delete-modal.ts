import { Component, inject, Input, output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [],
  selector: 'app-confirm-delete-modal',
  styleUrl: './confirm-delete-modal.css',
  templateUrl: './confirm-delete-modal.html',
})
export class ConfirmDeleteModal {
  activeModal = inject(NgbActiveModal);
  @Input() itemName = '';
  confirmDelete = output<boolean>();

  emitYesDelete() {
    this.confirmDelete.emit(true);
    this.activeModal.close();
  }

  emitNoCancel() {
    this.confirmDelete.emit(false);
    this.activeModal.close();
  }
}
