import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTemplates from '../reducers/templates.reducer';
import * as fromRouter from 'src/app/app-routing/store/reducers';

import {NotificationTemplateDto} from 'src/app/models';

const getTemplatesState = createSelector(
  fromFeature.getNotificationsTemplatesState,
  (state: fromFeature.NotificationsTemplatesState) => state.templates
);

export const getTemplatesEntities = createSelector(
  getTemplatesState,
  fromTemplates.getTemplatesEntities
);

export const getSelectedTemplate = createSelector(
  getTemplatesEntities,
  fromRouter.getRouterState,
  (entities, router): NotificationTemplateDto => {
    return router && router.state && entities[router.state.params.templateId];
  }
);


export const getAllTemplates = createSelector(
  getTemplatesEntities,
  entities => {
    return entities && Object.keys(entities).map(id => entities[id]);
  }
);

export const getTemplatesLoaded = createSelector(
  getTemplatesState,
  fromTemplates.getTemplatesLoaded
);



