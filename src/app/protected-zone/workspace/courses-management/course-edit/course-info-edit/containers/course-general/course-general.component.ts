import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseDto, UpdateCourseCommand } from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-general-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-general.component.scss'],
  template: `
    <section>
      <div fxLayout="column" fxLayoutGap="10px">
        <app-course-general-form
          [course]="course$ | async"
          (updated)="onCourseUpdated($event)"
        ></app-course-general-form>

        <app-course-skills-list
          [course]="course$ | async"
          (updated)="onCourseUpdated($event)"
        >
        </app-course-skills-list>
      </div>
    </section>
  `
})
export class CourseGeneralComponent implements OnInit {
  course$: Observable<CourseDto>;

  constructor(private store: Store<fromStore.CourseManagementState>) {}

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourse);
  }

  onCourseUpdated(command: UpdateCourseCommand) {
    this.store.dispatch(fromStore.updateCourse(command));
  }
}
