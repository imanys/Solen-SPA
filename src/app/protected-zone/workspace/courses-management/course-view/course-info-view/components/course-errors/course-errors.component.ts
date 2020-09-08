import {Component, ChangeDetectionStrategy, Input} from '@angular/core';


import {CourseErrorDto} from 'src/app/models';


@Component({
  selector: 'app-course-errors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-subtitle
      >Errors ({{errors.length}}) :
      </mat-card-subtitle>
      <mat-card-content>
        <app-errors-display [errors]="errors"></app-errors-display>
        <p *ngIf="errors.length === 0">
          <app-thumb-up-icon></app-thumb-up-icon>
          No errors
        </p>
      </mat-card-content>
    </mat-card>

  `
})
export class CourseErrorsComponent {
  @Input() courseErrors: CourseErrorDto[];

  get errors() {
    return this.courseErrors.map(x => x.error);
  }
}
