import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../../shared/store';

import {LastCreatedCourseDto, LastPublishedCourseDto, StorageInfoDto, UserCountInfoDto} from 'src/app/models';


@Component({
  selector: 'app-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout fxLayoutGap="20px">
      <app-storage-user-info [storageInfo]="storageInfo$ | async"
                             [userCountInfo]="userCountInfo$ | async">

      </app-storage-user-info>
      <app-courses-info [courseCount]="courseCount$ | async"
                        [lastCreatedCourse]="lastCreatedCourse$ | async"
                        [lastPublishedCourse]="lastPublishedCourse$ | async">

      </app-courses-info>
    </div>

  `
})
export class DashboardContainerComponent implements OnInit {
  storageInfo$: Observable<StorageInfoDto>;
  userCountInfo$: Observable<UserCountInfoDto>;
  courseCount$: Observable<number>;
  lastCreatedCourse$: Observable<LastCreatedCourseDto>;
  lastPublishedCourse$: Observable<LastPublishedCourseDto>;

  constructor(private store: Store<fromStore.DashboardState>) {
  }

  ngOnInit() {
    this.storageInfo$ = this.store.select(fromStore.getStorageInfo);
    this.userCountInfo$ = this.store.select(fromStore.getUserCount);
    this.courseCount$ = this.store.select(fromStore.getCourseCount);
    this.lastCreatedCourse$ = this.store.select(fromStore.getLastCreatedCourse);
    this.lastPublishedCourse$ = this.store.select(fromStore.getLastPublishedCourse);
  }

}

