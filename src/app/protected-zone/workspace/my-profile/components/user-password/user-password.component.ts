import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {UpdateCurrentUserPasswordCommand} from 'src/app/models';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-user-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-password.component.scss'],
  template: `
    <mat-card fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
      <form
        [formGroup]="form"
        fxLayout="column"
        fxLayoutAlign="center center"
        fxLayoutGap="10px"
        autocomplete="off">
        <mat-form-field>
          <input
            matInput
            type="password"
            placeholder="New password"
            formControlName="newPassword"
            required
          />
          <mat-error *ngIf="form.get('newPassword').hasError('required')">
            The Password is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            type="password"
            placeholder="Confirm new password"
            formControlName="confirmNewPassword"
            [errorStateMatcher]="matcher"
            required
          />
          <mat-error *ngIf="form.get('confirmNewPassword').hasError('required')">
            The field Confirm Password is required
          </mat-error>
          <mat-error *ngIf="form.hasError('notSame') && !form.get('confirmNewPassword').hasError('required')">
            Passwords do not match
          </mat-error>
        </mat-form-field>
      </form>
      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onSave()" [disabled]="form.invalid">
          <mat-icon>done</mat-icon>
          Change password
        </button>
      </div>
    </mat-card>
  `
})
export class UserPasswordComponent {
  @Output() updated = new EventEmitter<UpdateCurrentUserPasswordCommand>();

  form = this.fb.group({
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required],
  }, {validator: this.checkPasswords});

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
  }

  onSave() {
    const {value, valid} = this.form;
    if (valid) {
      this.updated.emit({...value});
    }
  }

  checkPasswords(form: FormGroup) {
    const pass = form.get('newPassword').value;
    const confirmPass = form.get('confirmNewPassword').value;

    return pass === confirmPass ? null : {notSame: true};
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.touched && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
