import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {CourseErrorDto, ModuleDto} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-content-view-modules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules.component.scss'],
  template: `
    <app-modules-list-view
      [modules]="modules$ | async"
      [currentModule]="currentModule$ | async"
      [courseErrors]="courseErrors$ | async"
      (moduleSelected)="onModuleSelected($event)"
    >
    </app-modules-list-view>
  `
})
export class ModulesComponent implements OnInit {
  modules$: Observable<ModuleDto[]>;
  currentModule$: Observable<ModuleDto>;
  courseErrors$: Observable<CourseErrorDto[]>;

  constructor(private store: Store<fromStore.CourseManagementState>) {}

  ngOnInit() {
    this.modules$ = this.store.select(fromStore.getAllModules);
    this.currentModule$ = this.store.select(fromStore.getSelectedModule);
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
  }

  onModuleSelected(event: string) {
    this.store.dispatch(fromStore.setCurrentModuleId(event));
    this.store.dispatch(fromStore.setCurrentLectureId(null));
  }
}
