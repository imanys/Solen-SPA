import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-learning-path-create-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 mat-dialog-title>New Learning Path</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" fxLayout="column" fxLayoutGap="10px" autocomplete="off">
        <mat-form-field>
          <input
            matInput
            placeholder="Learning path name"
            formControlName="name"
            [maxlength]="nameMaxlength"
            (keydown.enter)="onKeydown($event)"
            required
          />
          <mat-hint align="end">
            {{ form.get('name').value?.length || 0 }}/ {{ nameMaxlength }}
          </mat-hint>
          <mat-error *ngIf="form.get('name').hasError('required')">
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
export class LearningPathCreateDialogComponent {
  nameMaxlength = 50;

  create = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxlength)]]
  });

  constructor(
    public dialogRef: MatDialogRef<LearningPathCreateDialogComponent>,
    private fb: FormBuilder) {
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
