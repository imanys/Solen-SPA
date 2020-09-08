import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {CourseDto, UpdateCourseCommand} from 'src/app/models/models';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-course-general-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-general-form.component.scss'],
  template: `
    <mat-card>
      <mat-card-subtitle>Course info</mat-card-subtitle>
      <mat-card-content>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutGap="10px"
          fxLayoutAlign="center center"
          autocomplete="off"
        >
          <mat-form-field>
            <input
              matInput
              placeholder="Title"
              formControlName="title"
              [maxlength]="titleMaxlength"
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
            <input
              matInput
              placeholder="Subtitle"
              formControlName="subtitle"
              [maxlength]="subtitleMaxlength"
            />
            <mat-hint align="end">
              {{ form.get('subtitle').value?.length || 0 }}/
              {{ subtitleMaxlength }}
            </mat-hint>
          </mat-form-field>

          <div class="description">
            <h4 class="description__title"> Description</h4>
            <app-text-editor
              [parent]="form"
              placeholder="Course description"
              controlName="description"
            ></app-text-editor>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class CourseGeneralFormComponent implements OnInit {
  titleMaxlength = 60;
  subtitleMaxlength = 120;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxlength)]],
    subtitle: ['', [Validators.maxLength(this.subtitleMaxlength)]],
    description: ''
  });

  @Input() course: CourseDto;
  @Input() deletionMessage: string;

  @Output() updated = new EventEmitter<UpdateCourseCommand>();
  @Output() deleted = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.patchValue(this.course);

    this.form.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => this.update());
  }

  update() {
    const {value, valid} = this.form;
    if (valid) {
      this.updated.emit({
        courseId: this.course.id,
        ...value
      });
    }
  }
}
