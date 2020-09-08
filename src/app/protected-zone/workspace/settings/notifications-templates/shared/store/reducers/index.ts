import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromTemplates from './templates.reducer';

export interface NotificationsTemplatesState {
  templates: fromTemplates.State;
}

export const reducers: ActionReducerMap<NotificationsTemplatesState> = {
  templates: fromTemplates.reducer
};

export const getNotificationsTemplatesState = createFeatureSelector<NotificationsTemplatesState>('notifications-templates-settings');
