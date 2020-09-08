import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ModuleDto,
  CourseDto,
  UpdateModuleCommand,
  CreateModuleCommand, CourseErrorDto
} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-content-edit-modules',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules.component.scss'],
  template: `
    <app-modules-list-edit
      [courseId]="(course$ | async).id"
      [modules]="modules$ | async"
      [currentModule]="currentModule$ | async"
      [deletionMessage]="moduleDeletionMessage"
      [courseErrors]="courseErrors$ | async"
      (modulesOrdred)="onModulesOrdered($event)"
      (moduleSelected)="onModuleSelected($event)"
      (moduleUpdated)="onModuleUpdated($event)"
      (moduleCreated)="onModuleCreated($event)"
      (moduleDeleted)="onModuleDeleted($event)"
      (newModule)="onNewModule()"
    >
    </app-modules-list-edit>
  `
})
export class ModulesComponent implements OnInit {
  course$: Observable<CourseDto>;
  modules$: Observable<ModuleDto[]>;
  currentModule$: Observable<ModuleDto>;
  courseErrors$: Observable<CourseErrorDto[]>;

  moduleDeletionMessage = 'Are you sur to delete this module ?';

  constructor(private store: Store<fromStore.CourseManagementState>) {}

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourse);

    this.modules$ = this.store.select(fromStore.getAllModules);
    this.currentModule$ = this.store.select(fromStore.getSelectedModule);
    this.courseErrors$ = this.store.select(fromStore.getCourseErrors);
  }

  onModulesOrdered(event: ModuleDto[]) {
    this.store.dispatch(fromStore.reorderCourseModules(event));
  }

  onModuleSelected(event: string) {
    this.store.dispatch(fromStore.setCurrentModuleId(event));
    this.store.dispatch(fromStore.setCurrentLectureId(null));
  }

  onModuleUpdated(event: UpdateModuleCommand) {
    this.store.dispatch(fromStore.updateModule(event));
  }

  onModuleCreated(event: CreateModuleCommand) {
    this.store.dispatch(fromStore.createModule(event));
  }

  onModuleDeleted(event: string) {
    this.store.dispatch(fromStore.deleteModule(event));
  }

  onNewModule() {
    this.store.dispatch(fromStore.setCurrentModuleId(null));
  }
}
