import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Zone } from '../../interfaces/zone-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-zone-modal',
  styleUrl: './zone-modal.css',
  templateUrl: './zone-modal.html',
})
export class ZoneModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() zone: Zone | undefined;
  zoneSaved = output<Zone>();

  zoneForm = new FormGroup({
    name: new FormControl(''),
    province: new FormControl(''),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
  });

  ngOnInit(): void {
    if (this.zone) {
      this.zoneForm.patchValue(this.zone);
    }
  }

  formSubmit() {
    this.zoneSaved.emit({ ...this.zone, ...this.zoneForm.value } as Zone);
    this.activeModal.close();
  }
}
