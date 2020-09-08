import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['login.component.scss'],
  template: `
    <section fxLayout
             fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-card-title>Enter your credentials</mat-card-title>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutAlign="center center"
          fxLayoutGap="10px"
          (ngSubmit)="onSubmit()"
          autocomplete="off"
        >
          <mat-form-field>
            <input
              matInput
              type="email"
              placeholder="Email"
              formControlName="email"
              required
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
          <mat-form-field>
            <input
              matInput
              type="password"
              placeholder="Password"
              formControlName="password"
              required
            />
            <mat-error *ngIf="form.get('password').hasError('required')"
            >The password is required
            </mat-error
            >
          </mat-form-field>

          <button mat-raised-button color="primary" [disabled]="form.invalid">
            Log in
          </button>
          <h5><a [routerLink]="['/auth/forgotPassword']"> Forgot password ? </a></h5>
        </form>
      </mat-card>
    </section>
  `
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private store: Store<fromStore.AuthState>,
    private fb: FormBuilder
  ) {
  }

  onSubmit() {
    const {value, valid} = this.form;
    if (valid) {
      this.store.dispatch(fromStore.logUser({...value}));
    }
  }
}
