import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {CompleteOrganizationSigningUpCommand} from 'src/app/models';


@Component({
  selector: 'app-complete-signing-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['complete-signing-up.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-card-title>Create your organization account</mat-card-title>
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
              placeholder="Organization name"
              formControlName="organizationName"
              [maxlength]="organizationNameMaxLength"
              required
              [readonly]="isLoading"
            />
            <mat-hint align="end">
              {{ form.get('organizationName').value?.length || 0 }}/ {{ organizationNameMaxLength }}
            </mat-hint>
            <mat-error *ngIf="form.get('organizationName').hasError('required')">
              The organization name is required
            </mat-error>
          </mat-form-field>

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

          <button mat-raised-button color="primary" [disabled]="form.invalid || isLoading">
            {{isLoading ? 'Loading' : 'Create'}}
          </button>
        </form>
      </mat-card>
    </div>
  `
})
export class CompleteSigningUpComponent {
  organizationNameMaxLength = 60;
  userNameMaxLength = 30;

  @Input() isLoading = false;
  @Output() completeSigningUp = new EventEmitter<CompleteOrganizationSigningUpCommand>();

  form = this.fb.group({
    organizationName: ['', [Validators.required, Validators.maxLength(this.organizationNameMaxLength)]],
    userName: ['', [Validators.required, Validators.maxLength(this.userNameMaxLength)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validator: this.checkPasswords});

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    const {value, valid} = this.form;
    if (valid) {
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
