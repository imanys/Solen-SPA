import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import * as fromStore from '../../../../shared/store';
import * as fromServices from '../../../../shared/services';

import {
  CourseForLearningPathDto,
  LearningPathDto,
  RemoveCourseFromLearningPathCommand
} from 'src/app/models';
import {CoursesToAddComponent} from '../../components';


@Component({
  selector: 'app-learning-path-courses-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-courses [learningPath]="learningPath$ | async"
                               [courses]="courses$ | async"
                               (removeCourse)="onRemoveCourse($event)"
                               (addCourses)="addCoursesDialog($event)"
                               (coursesOrdered)="onCoursesOrdered($event)">
    </app-learning-path-courses>
  `
})
export class LearningPathCoursesContainerComponent implements OnInit, OnDestroy {
  learningPath$: Observable<LearningPathDto>;
  courses$: Observable<CourseForLearningPathDto[]>;
  coursesSubscription: Subscription;

  constructor(private store: Store<fromStore.LearningPathsState>,
              private service: fromServices.LearningPathCoursesService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.learningPath$ = this.store.select(fromStore.getSelectedLearningPath);
    this.courses$ = this.store.select(fromStore.getLearningPathCourses);
  }

  onRemoveCourse(command: RemoveCourseFromLearningPathCommand) {
    this.store.dispatch(fromStore.removeCourseFromLearningPath(command));
  }

  addCoursesDialog(learningPathId: string) {
    this.coursesSubscription = this.service.getCoursesToAdd(learningPathId).subscribe(courses => {
      const dialogRef = this.dialog.open(
        CoursesToAddComponent,
        {
          width: '600px',
          data: {
            courses,
          }
        }
      );

      dialogRef.componentInstance.coursesAdd.subscribe(
        (coursesIds) => {
          const command = {learningPathId, coursesIds};
          this.store.dispatch(fromStore.addCoursesToLearningPath(command));
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.coursesSubscription) {
      this.coursesSubscription.unsubscribe();
    }
  }

  onCoursesOrdered(courses: CourseForLearningPathDto[]) {
    this.store.dispatch(fromStore.updateCoursesOrders(courses));
  }
}

