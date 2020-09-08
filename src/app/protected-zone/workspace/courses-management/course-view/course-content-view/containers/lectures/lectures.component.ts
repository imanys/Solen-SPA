import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {ModuleDto, LectureDto, CourseErrorDto} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-lectures-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures.component.scss'],
  template: `
    <app-lectures-list-view
      [module]="currentModule$ | async"
      [lectures]="lectures$ | async"
      [currentLecture]="currentLecture$ | async"
      [courseErrors]="courseErrors$ | async"
      (lectureSelected)="onLectureSelected($event)"
    >
    </app-lectures-list-view>
  `
})
export class LecturesComponent implements OnInit {
  currentModule$: Observable<ModuleDto>;
  lectures$: Observable<LectureDto[]>;
  currentLecture$: Observable<LectureDto>;
  courseErrors$: Observable<CourseErrorDto[]>;

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.currentModule$ = this.store.select(fromStore.getSelectedModule);

    this.lectures$ = this.store.select(fromStore.getAllLectures);
    this.currentLecture$ = this.store.select(fromStore.getSelectedLecture);
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
  }

  onLectureSelected(event: string) {
    this.store.dispatch(fromStore.setCurrentLectureId(event));
  }
}
