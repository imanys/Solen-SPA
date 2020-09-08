import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {CourseDto} from 'src/app/models';
import * as fromStore from '../../../../shared/store';
import * as fromRouter from 'src/app/app-routing/store';

@Component({
  selector: 'app-course-info-edit',
  styleUrls: ['course-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-course-info-header
      [course]="course$ | async"
      [deletionMessage]="deletionMessage"
      (delete)="onDelete($event)"
      (finishEditing)="onFinishEditing($event)"
    ></app-course-info-header>
  `
})
export class CourseInfoComponent implements OnInit {
  course$: Observable<CourseDto>;
  deletionMessage = 'Are you sur to delete this course ?';

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourse);
  }

  onDelete(courseId: string): void {
    this.store.dispatch(fromStore.deleteCourse(courseId));
  }

  onFinishEditing(event: string) {
    this.store.dispatch(
      fromRouter.go({
        path: ['/workspace/courses-management/courses', event, 'view']
      })
    );
  }
}
