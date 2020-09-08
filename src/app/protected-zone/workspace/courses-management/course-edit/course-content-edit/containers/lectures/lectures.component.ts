import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  LectureDto,
  UpdateLectureCommand,
  CreateLectureCommand,
  LectureType,
  ModuleDto, CourseErrorDto
} from 'src/app/models';

import * as fromStore from '../../../../shared/store';
import * as fromUiActions from 'src/app/shared/store/actions';

@Component({
  selector: 'app-course-lectures-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures.component.scss'],
  template: `
    <app-lectures-list-edit
      [module]="currentModule$ | async"
      [lectures]="lectures$ | async"
      [currentLecture]="currentLecture$ | async"
      [lectureTypes]="lectureTypes$ | async"
      [courseErrors]="courseErrors$ | async"
      [deletionMessage]="lectureDeletionMessage"
      [moduleCount]="moduleCount$ | async"
      (lecturesOrdred)="onLecturesOrdered($event)"
      (lectureSelected)="onLectureSelected($event)"
      (lectureUpdated)="onLectureUpdated($event)"
      (lectureCreated)="onLectureCreated($event)"
      (lectureDeleted)="onLectureDeleted($event)"
      (errorOccurred)="onErrorOccurred($event)"
      (newLecture)="onNewLecture()"
    >
    </app-lectures-list-edit>
  `
})
export class LecturesComponent implements OnInit {
  lectures$: Observable<LectureDto[]>;
  lectureTypes$: Observable<LectureType[]>;
  currentLecture$: Observable<LectureDto>;
  currentModule$: Observable<ModuleDto>;
  courseErrors$: Observable<CourseErrorDto[]>;
  moduleCount$: Observable<number>;

  lectureDeletionMessage = 'Are you sur to delete this lecture ?';

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.lectures$ = this.store.select(fromStore.getAllLectures);
    this.currentLecture$ = this.store.select(fromStore.getSelectedLecture);
    this.lectureTypes$ = this.store.select(fromStore.getLectureTypes);
    this.currentModule$ = this.store.select(fromStore.getSelectedModule);
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
    this.moduleCount$ = this.store.select(fromStore.getModulesCount);
  }

  onLecturesOrdered(event: LectureDto[]) {
    this.store.dispatch(fromStore.reorderCourseLectures(event));
  }

  onLectureSelected(event: string) {
    this.store.dispatch(fromStore.setCurrentLectureId(event));
  }

  onLectureUpdated(event: UpdateLectureCommand) {
    this.store.dispatch(fromStore.updateLecture(event));
  }

  onLectureCreated(event: CreateLectureCommand) {
    this.store.dispatch(fromStore.createLecture(event));
  }

  onLectureDeleted(event: LectureDto) {
    this.store.dispatch(fromStore.deleteLecture(event));
  }

  onErrorOccurred(event: any) {
    this.store.dispatch(fromUiActions.openSnackBarError(event));
  }

  onNewLecture() {
    this.store.dispatch(fromStore.setCurrentLectureId(null));
  }
}
