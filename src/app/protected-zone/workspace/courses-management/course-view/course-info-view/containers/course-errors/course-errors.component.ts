import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {CourseErrorDto} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-errors-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-errors.component.scss'],
  template: `
    <section>
      <app-course-errors [courseErrors]="courseErrors$ | async"></app-course-errors>
    </section>
  `
})
export class CourseErrorsComponent implements OnInit {
  courseErrors$: Observable<CourseErrorDto[]>;

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
  }
}
