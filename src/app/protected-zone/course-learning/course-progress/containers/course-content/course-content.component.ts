import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {LearnerModuleDto, LearnerLectureDto} from 'src/app/models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-course-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-content.component.scss'],
  template: `
    <app-nex-prev [isLastLecture]="isLastLecture$ | async"
                  [isFirstLecture]="isFirstLecture$ | async"
                  (nextClick)="goToTheNextLecture()"
                  (previousClick)="goToThePreviousLecture()">

    </app-nex-prev>
    <div class="scrollable" fxLayout="column"
         fxLayoutGap="2px">
      <app-module
        *ngFor="let module of modules$ | async"
        [module]="module"
        [currentModuleId]="currentModuleId$ | async"
        [currentLecture]="currentLecture$ | async"
        [completedLectures]="completedLectures$ | async"
        (lectureSelected)="onLectureSelected($event)"
        (completeLecture)="completeLecture($event)"
        (uncompleteLecture)="uncompleteLecture($event)"
      >
      </app-module>
    </div>
  `
})
export class CourseContentComponent implements OnInit, AfterViewInit {
  modules$: Observable<LearnerModuleDto[]>;
  currentLecture$: Observable<LearnerLectureDto>;
  currentModuleId$: Observable<string>;
  isLastLecture$: Observable<boolean>;
  isFirstLecture$: Observable<boolean>;
  completedLectures$: Observable<string[]>;

  constructor(private store: Store<fromStore.LearningState>) {
  }

  ngOnInit() {
    this.modules$ = this.store.select(fromStore.getModules);
    this.currentLecture$ = this.store.select(fromStore.getSelectedLecture);
    this.currentModuleId$ = this.store.select(fromStore.getCurrentModuleId);
    this.isLastLecture$ = this.store.select(fromStore.isLastLecture);
    this.isFirstLecture$ = this.store.select(fromStore.isFirstLecture);
    this.completedLectures$ = this.store.select(fromStore.getCompletedLectures);
  }

  ngAfterViewInit() {
    this.store.dispatch(fromStore.courseContentLoaded());
  }

  onLectureSelected(lectureId: string) {
    this.store.dispatch(fromStore.nextLecture(lectureId));
  }

  goToTheNextLecture() {
    this.store.dispatch(fromStore.goToTheNextLecture());
  }

  goToThePreviousLecture() {
    this.store.dispatch(fromStore.goToThePreviousLecture());
  }

  completeLecture(lectureId: string) {
    this.store.dispatch(fromStore.completeLecture(lectureId));
  }

  uncompleteLecture(lectureId: string) {
    this.store.dispatch(fromStore.uncompleteLecture(lectureId));
  }
}
