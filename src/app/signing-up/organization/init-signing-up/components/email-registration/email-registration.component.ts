import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {InitSigningUpCommand} from 'src/app/models';

@Component({
  selector: 'app-email-registration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['email-registration.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center start" fxLayoutGap="20px">
        <mat-card-header>
          <mat-card-title>First, enter your email</mat-card-title>
          <mat-card-subtitle>We’ll send you an email to confirm your address.
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
                [maxlength]="emailMaxLength"
                required
                [readonly]="isLoading"
              />
              <mat-hint align="end">
                {{ form.get('email').value?.length || 0 }}/ {{ emailMaxLength }}
              </mat-hint>
              <mat-error *ngIf="form.get('email').hasError('required')">
                The email is required
              </mat-error>
              <mat-error *ngIf="form.get('email').hasError('email')">
                The email is invalid
              </mat-error>
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
export class EmailRegistrationComponent {
  emailMaxLength = 50;

  @Input() isLoading = false;
  @Output() initSigningUp = new EventEmitter<InitSigningUpCommand>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]],
  });


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    const {value, valid} = this.form;
    if (valid) {
      this.initSigningUp.emit({...value});
    }
  }
}
