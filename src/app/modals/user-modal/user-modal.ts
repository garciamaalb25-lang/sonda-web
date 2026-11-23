import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user-list-response';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-modal',
  styleUrl: './user-modal.css',
  templateUrl: './user-modal.html',
})
export class UserModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() user: User | undefined;
  userSaved = output<User>();

  userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    experienceLevel: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  formSubmit() {
    this.userSaved.emit({ ...this.user, ...this.userForm.value } as User);
    this.activeModal.close();
  }
}
