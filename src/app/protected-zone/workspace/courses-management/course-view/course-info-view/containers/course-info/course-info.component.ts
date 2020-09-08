import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {CourseDto, CourseErrorDto} from 'src/app/models';
import {ConfirmationDialogComponent} from 'src/app/shared/components';
import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-info-view',
  styleUrls: ['course-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-course-info-header
      [course]="course$ | async"
      [courseErrors]="courseErrors$ | async"
      (published)="publishCourse($event)"
      (unpublished)="unpublishCourse($event)"
      (edited)="editCourse($event)"
    ></app-course-info-header>
  `
})
export class CourseInfoComponent implements OnInit {
  course$: Observable<CourseDto>;
  courseErrors$: Observable<CourseErrorDto[]>;

  constructor(
    private store: Store<fromStore.CourseManagementState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourse);
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
  }

  editCourse(course: CourseDto) {
    this.store.dispatch(fromStore.draftCourse({courseId: course.id}));
  }

  publishCourse(course: CourseDto) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sur to publish the course ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(fromStore.publishCourse({courseId: course.id}));
      }
    });
  }

  unpublishCourse(course: CourseDto) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sur to unpublish the course ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(fromStore.unpublishCourse({courseId: course.id}));
      }
    });
  }
}
