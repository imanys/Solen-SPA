import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {ForgotPasswordCommand} from 'src/app/models';

@Component({
  selector: 'app-forgot-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['forgot-password.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center start" fxLayoutGap="20px">
        <mat-card-header>
          <mat-card-title>Reset your password</mat-card-title>
          <mat-card-subtitle>
            We’ll send you a password reset link.
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form
            [formGroup]="form"
            fxLayout
            fxLayoutAlign="start center"
            fxLayoutGap="20px"
            (ngSubmit)="onSubmit()"
            autocomplete="off"
          >
            <mat-form-field>
              <input
                matInput
                type="email"
                placeholder="Your email"
                formControlName="email"
                required
                [readonly]="isLoading"
              />
              <mat-error *ngIf="form.get('email').hasError('required')"
              >The email is required
              </mat-error
              >
              <mat-error *ngIf="form.get('email').hasError('email')"
              >The email is invalid
              </mat-error
              >
            </mat-form-field>

            <button mat-raised-button color="primary" [disabled]="form.invalid || isLoading">
              {{isLoading ? 'Loading' : 'Confirm'}}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ForgotPasswordComponent {
  @Input() isLoading = false;
  @Output() forgotPassword = new EventEmitter<ForgotPasswordCommand>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    const {value, valid} = this.form;
    if (valid) {
      this.forgotPassword.emit({...value});
    }
  }
}
