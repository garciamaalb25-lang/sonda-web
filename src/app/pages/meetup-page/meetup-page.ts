import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Meetup } from '../../interfaces/meetup-list-response';
import { MeetupService } from '../../services/meetup-service';
import { MeetupItemComponent } from '../../components/meetup-item-component/meetup-item-component';
import { MeetupModal } from '../../modals/meetup-modal/meetup-modal';
import { ConfirmDeleteModal } from '../../shared/confirm-delete-modal/confirm-delete-modal';

@Component({
  imports: [MeetupItemComponent],
  selector: 'app-meetup-page',
  styleUrl: './meetup-page.css',
  templateUrl: './meetup-page.html',
})
export class MeetupPage {
  meetupService = inject(MeetupService);
  private modalService = inject(NgbModal);

  meetupList = signal<Meetup[]>([
    { id: 1, title: 'Salida matinal en Tarifa', spotId: 1, spotName: 'Isla de las Palomas', zoneName: 'Tarifa', dateTime: '2026-11-22T08:30', maxParticipants: 6, currentParticipants: 3, minLevel: 'INTERMEDIO', status: 'ABIERTA', organizer: 'pescador_huelva' },
    { id: 2, title: 'Apnea en Cabo de Gata', spotId: 3, spotName: 'Cala San Pedro', zoneName: 'Cabo de Gata', dateTime: '2026-11-29T10:00', maxParticipants: 4, currentParticipants: 4, minLevel: 'AVANZADO', status: 'COMPLETA', organizer: 'apnea_cadiz' },
  ]);

  openAddModal() {
    const modalRef = this.modalService.open(MeetupModal);
    modalRef.componentInstance.meetupSaved.subscribe((newMeetup: Meetup) => {
      newMeetup.id = Date.now();
      this.meetupList.set([...this.meetupList(), newMeetup]);
    });
  }

  openEditModal(meetup: Meetup) {
    const modalRef = this.modalService.open(MeetupModal);
    modalRef.componentInstance.meetup = meetup;
    modalRef.componentInstance.meetupSaved.subscribe((editedMeetup: Meetup) => {
      this.meetupList.set(this.meetupList().map(item => item.id === editedMeetup.id ? editedMeetup : item));
    });
  }

  openDeleteModal(meetup: Meetup) {
    const modalRef = this.modalService.open(ConfirmDeleteModal);
    modalRef.componentInstance.itemName = meetup.title;
    modalRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.meetupList.set(this.meetupList().filter(item => item.id !== meetup.id));
      }
    });
  }
}
