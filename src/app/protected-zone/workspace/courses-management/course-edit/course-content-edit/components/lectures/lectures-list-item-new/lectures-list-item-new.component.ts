import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LectureDto, LectureType } from 'src/app/models';

@Component({
  selector: 'app-lectures-list-item-new',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures-list-item-new.component.scss'],
  template: `
    <app-expansion-panel [expanded]="true">
      <span slot="title">{{ title }}</span>
      <div slot="content">
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutGap="10px"
          autocomplete="off"
        >
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
              {{ form.get('title').value?.length || 0 }}/
              {{ titleMaxlength }}
            </mat-hint>
            <mat-error *ngIf="form.get('title').hasError('required')">
              The title is required
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Lecture Type</mat-label>
            <mat-select formControlName="lectureType" required>
              <mat-option
                *ngFor="let lectureType of lectureTypes"
                [value]="lectureType.id"
              >
                {{ lectureType.value }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('lectureType').hasError('required')">
              The lecture type is required
            </mat-error>
          </mat-form-field>
        </form>
      </div>
      <div slot="actions">
        <app-create-button-icon
          (saved)="create()"
          (canceled)="cancel()"
          tooltip="create lecture"
        >
        </app-create-button-icon>
      </div>
    </app-expansion-panel>
  `
})
export class LecturesListItemNewComponent {
  titleMaxlength = 60;

  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.titleMaxlength)]
    ],
    lectureType: ['', Validators.required],
    content: null
  });

  @Input() lecture: LectureDto;
  @Input() lectureTypes: LectureType[] = [];

  @Output() created = new EventEmitter<LectureDto>();
  @Output() canceled = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get title(): string {
    return 'New lecture';
  }

  create() {
    const { value, valid, touched } = this.form;
    if (valid && touched) {
      this.created.emit({ ...value });
    }
  }

  cancel() {
    this.canceled.emit();
  }

  onKeydown(event: KeyboardEvent) {
    this.form.markAsTouched();

    this.create();
  }
}
