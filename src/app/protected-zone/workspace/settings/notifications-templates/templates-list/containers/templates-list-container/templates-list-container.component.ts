import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../../shared/store';

import {NotificationTemplateDto, ToggleNotificationActivationCommand} from 'src/app/models';


@Component({
  selector: 'app-templates-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-templates-list [templates]="templates$ | async"
                        (templateUpdated)="onTemplateUpdate($event)">
    </app-templates-list>
  `
})
export class TemplatesListContainerComponent implements OnInit {
  templates$: Observable<NotificationTemplateDto[]>;

  constructor(private store: Store<fromStore.NotificationsTemplatesState>) {
  }

  ngOnInit() {
    this.templates$ = this.store.select(fromStore.getAllTemplates);
  }

  onTemplateUpdate(event: ToggleNotificationActivationCommand) {
    this.store.dispatch(fromStore.updateTemplate(event));
  }

}

