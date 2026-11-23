import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Spot } from '../../interfaces/spot-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-spot-modal',
  styleUrl: './spot-modal.css',
  templateUrl: './spot-modal.html',
})
export class SpotModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() spot: Spot | undefined;
  spotSaved = output<Spot>();

  spotForm = new FormGroup({
    name: new FormControl(''),
    zoneId: new FormControl(0),
    zoneName: new FormControl(''),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
    bottomType: new FormControl(''),
    minDepth: new FormControl(0),
    maxDepth: new FormControl(0),
    legalStatus: new FormControl(''),
    validated: new FormControl(false),
  });

  ngOnInit(): void {
    if (this.spot) {
      this.spotForm.patchValue(this.spot);
    }
  }

  formSubmit() {
    this.spotSaved.emit({ ...this.spot, ...this.spotForm.value } as Spot);
    this.activeModal.close();
  }
}
