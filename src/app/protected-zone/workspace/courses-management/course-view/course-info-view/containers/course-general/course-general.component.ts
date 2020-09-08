import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseDto } from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-general',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-general.component.scss'],
  template: `
    <section>
      <div fxLayout="column" fxLayoutGap="10px">
        <app-course-author-status
          [course]="course$ | async"
        ></app-course-author-status>

        <app-course-general-view
          [course]="course$ | async"
        ></app-course-general-view>

        <app-course-skills-list [course]="course$ | async">
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
}
