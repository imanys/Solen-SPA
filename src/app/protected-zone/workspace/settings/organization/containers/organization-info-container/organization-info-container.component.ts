import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../store';

import {UpdateOrganizationInfoCommand} from 'src/app/models';


@Component({
  selector: 'app-organization-info-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-organization-info [organizationName]="organizationName$| async"
                           [subscriptionPlan]="subscriptionsPlan$ | async"
                           [maxStorage]="maxStorage$ | async"
                           [currentStorage]="currentStorage$ | async"
                           [usersCount]="usersCount$ | async"
                           (updated)="onUpdate($event)">

    </app-organization-info>
  `
})
export class OrganizationInfoContainerComponent implements OnInit {
  organizationName$: Observable<string>;
  subscriptionsPlan$: Observable<string>;
  maxStorage$: Observable<number>;
  currentStorage$: Observable<number>;
  usersCount$: Observable<number>;

  constructor(private store: Store<fromStore.OrganizationInfoState>) {
  }

  ngOnInit() {
    this.organizationName$ = this.store.select(fromStore.getOrganizationName);
    this.subscriptionsPlan$ = this.store.select(fromStore.getSubscriptionPlan);
    this.maxStorage$ = this.store.select(fromStore.getMaxStorage);
    this.currentStorage$ = this.store.select(fromStore.getCurrentStorage);
    this.usersCount$ = this.store.select(fromStore.getUsersCount);
  }

  onUpdate(event: UpdateOrganizationInfoCommand) {
    this.store.dispatch(fromStore.updateOrganizationInfo(event));
  }
}

