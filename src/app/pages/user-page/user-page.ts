import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user-list-response';
import { UserService } from '../../services/user-service';
import { UserItemComponent } from '../../components/user-item-component/user-item-component';
import { UserModal } from '../../modals/user-modal/user-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [UserItemComponent],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {
  userService = inject(UserService);
  private modalService = inject(NgbModal);

  userList = signal<User[]>([
    { id: 1, username: 'pescador_huelva', email: 'pescador@sonda.es', experienceLevel: 'AVANZADO', role: 'USER', status: 'ACTIVO', createdAt: '2026-09-12' },
    { id: 2, username: 'apnea_cadiz', email: 'apnea@sonda.es', experienceLevel: 'INTERMEDIO', role: 'USER', status: 'ACTIVO', createdAt: '2026-10-03' },
    { id: 3, username: 'admin', email: 'admin@sonda.es', experienceLevel: 'EXPERTO', role: 'ADMIN', status: 'ACTIVO', createdAt: '2026-08-01' },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(UserModal);
    modalRef.componentInstance.userSaved.subscribe((newUser: User) => {
      newUser.id = Date.now();
      this.userList.set([...this.userList(), newUser]);
    });
  }

  openEditModal(user: User) {
    const modalRef = this.modalService.open(UserModal);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.userSaved.subscribe((editedUser: User) => {
      this.userList.set(this.userList().map(item => item.id === editedUser.id ? editedUser : item));
    });
  }

  openDeleteModal(user: User) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = user.username;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userList.set(this.userList().filter(item => item.id !== user.id));
      }
    });
  }
}
