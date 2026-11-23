import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from '../../interfaces/ad-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-ad-modal',
  styleUrl: './ad-modal.css',
  templateUrl: './ad-modal.html',
})
export class AdModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() ad: Ad | undefined;
  adSaved = output<Ad>();

  adForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(0),
    condition: new FormControl(''),
    city: new FormControl(''),
    mainPhotoUrl: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.ad) {
      this.adForm.patchValue(this.ad);
    }
  }

  formSubmit() {
    this.adSaved.emit({ ...this.ad, ...this.adForm.value } as Ad);
    this.activeModal.close();
  }
}
