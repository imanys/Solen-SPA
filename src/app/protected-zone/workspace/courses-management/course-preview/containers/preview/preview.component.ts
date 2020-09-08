import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ModuleDetailDto, LectureDto } from 'src/app/models';
import * as fromStore from '../../../shared/store';

@Component({
  selector: 'app-course-preview',
  styleUrls: ['preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-subtitle>Preview</mat-card-subtitle>
      <mat-card-content fxLayout fxLayoutGap="10px">
        <div fxFlex="60">
          <app-current-lecture [lecture]="currentLecture$ | async">
          </app-current-lecture>
        </div>
        <mat-divider [vertical]="true"></mat-divider>
        <div fxFlex="40">
          <h4>Course content</h4>
          <app-module-detail
            *ngFor="let module of courseContent$ | async; let first = first"
            [module]="module"
            [currentLecture]="currentLecture$ | async"
            [firstModule]="first"
            (lectureSelected)="onLectureSelected($event)"
          >
          </app-module-detail>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class PreviewComponent implements OnInit {
  courseContent$: Observable<ModuleDetailDto[]>;
  currentLecture$: Observable<LectureDto>;

  constructor(private store: Store<fromStore.CourseManagementState>) {}

  ngOnInit() {
    this.courseContent$ = this.store.select(fromStore.getCourseContent);
    this.currentLecture$ = this.store.select(fromStore.getSelectedLecture);
  }

  onLectureSelected(event: string) {
    this.store.dispatch(fromStore.setCurrentLectureId(event));
  }
}
