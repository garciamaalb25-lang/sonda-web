import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { License } from '../../interfaces/license-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-license-modal',
  styleUrl: './license-modal.css',
  templateUrl: './license-modal.html',
})
export class LicenseModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() license: License | undefined;
  licenseSaved = output<License>();

  licenseForm = new FormGroup({
    userId: new FormControl(0),
    number: new FormControl(''),
    type: new FormControl(''),
    region: new FormControl(''),
    issueDate: new FormControl(''),
    expirationDate: new FormControl(''),
    valid: new FormControl(false),
  });

  ngOnInit(): void {
    if (this.license) {
      this.licenseForm.patchValue(this.license);
    }
  }

  formSubmit() {
    this.licenseSaved.emit({ ...this.license, ...this.licenseForm.value } as License);
    this.activeModal.close();
  }
}
