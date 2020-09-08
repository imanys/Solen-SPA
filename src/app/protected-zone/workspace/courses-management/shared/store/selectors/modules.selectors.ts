import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModules from '../reducers/modules.reducer';

import { ModuleDto } from 'src/app/models/models';

export const getModulesState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.modules
);

export const getModulesEntities = createSelector(
  getModulesState,
  fromModules.getModulesEntities
);

export const getSelectedModule = createSelector(
  getModulesEntities,
  getModulesState,
  (entities, state): ModuleDto => {
    return entities[state.currentModuleId];
  }
);

function sortByOrder(m1: ModuleDto, m2: ModuleDto) {
  return m1.order - m2.order;
}

export const getAllModules = createSelector(
  getModulesEntities,
  entities => {
    return Object.keys(entities)
      .map(id => entities[id])
      .sort(sortByOrder);
  }
);

export const getModulesCount = createSelector(
  getAllModules,
  modules => {
    return modules.length;
  }
);
