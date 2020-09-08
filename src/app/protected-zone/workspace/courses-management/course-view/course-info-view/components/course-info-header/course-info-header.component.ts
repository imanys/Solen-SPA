import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import {CourseDto, CourseErrorDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-info-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title fxLayout>
        <div>
          {{ course?.title }}
          <mat-card-subtitle> {{ course?.subtitle }}</mat-card-subtitle>
        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end">
          <div fxLayout="column" fxLayoutAlign="center" fxLayoutGap="5px">
            <button mat-mini-fab color="primary" (click)="editCourse()" [disabled]="!course.isEditable" matTooltip="Edit the course">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-mini-fab color="accent" *ngIf="isPublishable" (click)="publishCourse()"
                    matTooltip="Publish the course">
              <mat-icon>cloud_upload</mat-icon>
            </button>
            <button mat-mini-fab color="accent" *ngIf="course.isPublished" (click)="unpublishCourse()"
                    matTooltip="Unpublish the course">
              <mat-icon>cloud_off</mat-icon>
            </button>

          </div>
        </div>
      </mat-card-title>
    </mat-card>
  `
})
export class CourseInfoHeaderComponent {
  @Input() course: CourseDto;
  @Input() courseErrors: CourseErrorDto[];

  @Output() published = new EventEmitter<CourseDto>();
  @Output() unpublished = new EventEmitter<CourseDto>();
  @Output() edited = new EventEmitter<CourseDto>();

  publishCourse() {
    this.published.emit(this.course);
  }

  unpublishCourse() {
    this.unpublished.emit(this.course);
  }

  editCourse() {
    this.edited.emit(this.course);
  }

  get isPublishable(): boolean {
    return !this.course?.isPublished && this.courseErrors?.length === 0;
  }
}
