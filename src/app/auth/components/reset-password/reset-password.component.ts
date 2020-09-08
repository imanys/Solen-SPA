import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {ResetPasswordCommand} from 'src/app/models';


@Component({
  selector: 'app-reset-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['reset-password.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-card-title>Reset your password</mat-card-title>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutAlign="center center"
          fxLayoutGap="10px"
          (ngSubmit)="onSubmit()"
          autocomplete="off">
          <mat-form-field>
            <input
              matInput
              type="password"
              placeholder="New password"
              formControlName="newPassword"
              required
              [readonly]="isLoading"
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
              [readonly]="isLoading"
            />
            <mat-error *ngIf="form.get('confirmNewPassword').hasError('required')">
              The field Confirm Password is required
            </mat-error>
            <mat-error *ngIf="form.hasError('notSame') && !form.get('confirmNewPassword').hasError('required')">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <a mat-raised-button color="primary" (click)="onSubmit()" [disabled]="form.invalid || isLoading">
            {{isLoading ? 'Loading' : 'Reset'}}
          </a>
        </form>
      </mat-card>
    </div>
  `
})
export class ResetPasswordComponent {
  @Input() isLoading = false;
  @Output() resetPassword = new EventEmitter<ResetPasswordCommand>();

  form = this.fb.group({
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required],
  }, {validator: this.checkPasswords});

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    const {value, valid} = this.form;
    if (valid) {
      this.resetPassword.emit({...value});
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
