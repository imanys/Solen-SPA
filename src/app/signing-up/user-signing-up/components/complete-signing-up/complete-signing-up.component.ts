import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {CompleteUserSigningUpCommand} from 'src/app/models';


@Component({
  selector: 'app-complete-signing-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['complete-signing-up.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-card-title>Create your account</mat-card-title>
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
              placeholder="Username"
              formControlName="userName"
              [maxlength]="userNameMaxLength"
              required
              [readonly]="isLoading"
            />
            <mat-hint align="end">
              {{ form.get('userName').value?.length || 0 }}/ {{ userNameMaxLength }}
            </mat-hint>
            <mat-error *ngIf="form.get('userName').hasError('required')">
              The user name is required
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              type="password"
              placeholder="Password"
              formControlName="password"
              required
              [readonly]="isLoading"
            />
            <mat-error *ngIf="form.get('password').hasError('required')">
              The Password is required
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              type="password"
              placeholder="Confirm password"
              formControlName="confirmPassword"
              [errorStateMatcher]="matcher"
              required
              [readonly]="isLoading"
            />
            <mat-error *ngIf="form.get('confirmPassword').hasError('required')">
              The field Confirm Password is required
            </mat-error>
            <mat-error *ngIf="form.hasError('notSame') && !form.get('confirmPassword').hasError('required')">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <a mat-raised-button color="primary" (click)="onSubmit()" [disabled]="form.invalid || isLoading">
            {{isLoading ? 'Loading' : 'Create'}}
          </a>
        </form>
      </mat-card>
    </div>
  `
})
export class CompleteSigningUpComponent {
  userNameMaxLength = 30;

  @Input() isLoading = false;
  @Output() completeSigningUp = new EventEmitter<CompleteUserSigningUpCommand>();

  form = this.fb.group({
    userName: ['', Validators.required, Validators.maxLength(this.userNameMaxLength)],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validator: this.checkPasswords});

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    const {value, invalid} = this.form;
    if (!invalid) {
      this.completeSigningUp.emit({...value});
    }
  }


  checkPasswords(form: FormGroup) {
    const pass = form.get('password').value;
    const confirmPass = form.get('confirmPassword').value;

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
