import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CourseDto } from 'src/app/models/models';

@Component({
  selector: 'app-course-author-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-author-status.component.scss'],
  template: `
    <mat-card>
      <mat-card-subtitle>Author and status</mat-card-subtitle>
      <mat-card-content>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutGap="10px"
          fxLayoutAlign="center center"
        >
          <mat-form-field>
            <input
              matInput
              placeholder="Created by"
              formControlName="creator"
            />
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              placeholder="Creation date"
              formControlName="creationDate"
              [value]="form.get('creationDate').value | date: 'dd/MM/yyyy'"
            />
          </mat-form-field>
          <mat-form-field>
            <input matInput placeholder="Status" formControlName="status" />
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class CourseAuthorStatusComponent implements OnInit {
  form = this.fb.group({
    creator: '',
    creationDate: '',
    status: ''
  });

  @Input() course: CourseDto;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue(this.course);

    this.form.disable();
  }
}
