import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import * as fromStore from '../../../shared/store';

import {CreateCourseCommand} from 'src/app/models/models';

import * as fromComponents from '../../components';

@Component({
  selector: 'app-course-creation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-creation.component.scss'],
  template: `
    <button mat-mini-fab color="primary" (click)="createCourseDialog()" matTooltip="Add a new course">
      <mat-icon>add</mat-icon>
    </button>
  `
})
export class CourseCreationComponent {
  newCourseTitle = 'New course';

  constructor(
    private store: Store<fromStore.CourseManagementState>,
    private dialog: MatDialog
  ) {
  }

  createCourseDialog() {
    const dialogRef = this.dialog.open(
      fromComponents.CourseCreateDialogComponent,
      {
        width: '600px',
        data: {
          title: this.newCourseTitle,
          titleMaxlength: 60
        }
      }
    );

    dialogRef.componentInstance.create.subscribe(
      (command: CreateCourseCommand) => {
        this.store.dispatch(fromStore.createCourse(command));
      }
    );
  }
}
