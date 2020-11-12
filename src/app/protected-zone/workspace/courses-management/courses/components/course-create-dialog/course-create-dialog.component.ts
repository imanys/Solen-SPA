import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-instructor-course-create-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" fxLayout="column" fxLayoutGap="10px" autocomplete="off">
        <mat-form-field>
          <input
            matInput
            placeholder="Title"
            formControlName="title"
            [maxlength]="titleMaxlength"
            (keydown.enter)="onKeydown($event)"
            required
          />
          <mat-hint align="end">
            {{ form.get('title').value?.length || 0 }}/ {{ titleMaxlength }}
          </mat-hint>
          <mat-error *ngIf="form.get('title').hasError('required')">
            The title is required
          </mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="center">
      <button mat-raised-button [mat-dialog-close]="true" color="accent">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="form.invalid"
        (click)="onSubmit()"
      >
        Create
      </button>
    </div>
  `
})
export class CourseCreateDialogComponent {
  title: string;
  titleMaxlength = 0;

  create = new EventEmitter<any>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxlength)]]
  });

  constructor(
    public dialogRef: MatDialogRef<CourseCreateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.titleMaxlength = data.titleMaxlength;
  }

  onSubmit() {
    const {valid, value} = this.form;
    if (valid) {
      this.create.emit({...value});
      this.dialogRef.close();
    }
  }

  onKeydown(event: KeyboardEvent) {
    this.form.markAsTouched();
    this.onSubmit();
  }
}
