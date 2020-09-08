import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {UpdateCurrentUserInfoCommand, UserForProfileDto} from 'src/app/models';


@Component({
  selector: 'app-user-display-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-display-info.component.scss'],
  template: `
    <mat-card fxLayout="column" fxFlexAlign="center center">
      <form
        [formGroup]="form"
        fxLayout="column"
        fxLayoutGap="10px"
        autocomplete="off"
      >
        <mat-form-field>
          <input
            matInput
            placeholder="Username"
            formControlName="userName"
            [maxlength]="userNameMaxlength"
            required
          />
          <mat-hint align="end">
            {{ form.get('userName').value?.length || 0 }}/
            {{ userNameMaxlength }}
          </mat-hint>
          <mat-error *ngIf="form.get('userName').hasError('required')">
            The name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Email"
            value="{{userInfo?.email}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Learning path"
            value="{{userInfo?.learningPath}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Role(s)"
            value="{{userInfo?.roles}}"
            disabled
          />
        </mat-form-field>

      </form>
      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onSave()" [disabled]="form.invalid">
          <mat-icon>done</mat-icon>
          Save
        </button>
      </div>
    </mat-card>
  `
})
export class UserDisplayInfoComponent implements OnInit {
  @Input() userInfo: UserForProfileDto;

  @Output() updated = new EventEmitter<UpdateCurrentUserInfoCommand>();

  userNameMaxlength = 30;
  form = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(this.userNameMaxlength)]]
  });

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form.get('userName').setValue(this.userInfo?.userName);
  }

  onSave() {
    const {valid} = this.form;
    if (valid) {
      this.updated.emit({userName: this.form.get('userName').value});
    }
  }

}

