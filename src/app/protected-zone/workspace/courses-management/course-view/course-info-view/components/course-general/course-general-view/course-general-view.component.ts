import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {CourseDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-general-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-general-view.component.scss'],
  template: `
    <mat-card>
      <mat-card-subtitle>General</mat-card-subtitle>
      <mat-card-content>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutGap="10px"
          fxLayoutAlign="center center"
          autocomplete="off"
        >
          <mat-form-field>
            <input matInput placeholder="Title" formControlName="title"/>
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Subtitle" formControlName="subtitle"/>
          </mat-form-field>
          <div class="description">
            <h4 class="description__title"> Description</h4>
            <app-text-display
              [text]="form.get('description').value"
            ></app-text-display>
          </div>

        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class CourseGeneralViewComponent implements OnInit {
  form = this.fb.group({
    title: '',
    subtitle: '',
    description: ''
  });

  @Input() course: CourseDto;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.patchValue(this.course);
    this.form.disable();
  }
}
