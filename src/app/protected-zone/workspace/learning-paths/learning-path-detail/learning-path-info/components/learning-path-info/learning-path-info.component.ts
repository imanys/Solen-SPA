import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {LearningPathDto, UpdateLearningPathCommand} from 'src/app/models';


@Component({
  selector: 'app-learning-path-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path-info.component.scss'],
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
            placeholder="Name"
            formControlName="name"
            [maxlength]="nameMaxlength"
            required
          />
          <mat-hint align="end">
            {{ form.get('name').value?.length || 0 }}/
            {{ nameMaxlength }}
          </mat-hint>
          <mat-error *ngIf="form.get('name').hasError('required')">
            The name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Description"
            formControlName="description"
            [maxlength]="descriptionMaxlength"
          />
          <mat-hint align="end">
            {{ form.get('description').value?.length || 0 }}/
            {{ descriptionMaxlength }}
          </mat-hint>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Course Count"
            value="{{learningPath?.courseCount}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Learner Count"
            value="{{learningPath?.learnerCount}}"
            disabled
          />
        </mat-form-field>
      </form>
      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onSave()">
          <mat-icon>done</mat-icon>
          Save
        </button>
      </div>
    </mat-card>
  `
})
export class LearningPathInfoComponent implements OnInit {
  @Input() learningPath: LearningPathDto;

  @Output() updated = new EventEmitter<UpdateLearningPathCommand>();

  nameMaxlength = 50;
  descriptionMaxlength = 100;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxlength)]],
    description: ['', Validators.maxLength(this.descriptionMaxlength)]
  });

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form.get('name').setValue(this.learningPath.name);
    this.form.get('description').setValue(this.learningPath.description);
  }

  onSave() {
    const {valid} = this.form;
    if (valid) {
      const learningPathId = this.learningPath.id;
      const name = this.form.get('name').value;
      const description = this.form.get('description').value;

      this.updated.emit({learningPathId, name, description });
    }
  }
}

