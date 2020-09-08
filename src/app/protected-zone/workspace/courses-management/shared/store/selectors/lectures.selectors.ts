import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLectures from '../reducers/lectures.reducer';
import { getSelectedModule } from './modules.selectors';

import { LectureDto } from 'src/app/models/models';

export const getLecturesState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.lectures
);

export const getLecturesEntities = createSelector(
  getLecturesState,
  fromLectures.getLecturesEntities
);

export const getSelectedLecture = createSelector(
  getLecturesEntities,
  getLecturesState,
  (entities, state): LectureDto => {
    return entities[state.currentLectureId];
  }
);

function sortByOrder(l1: LectureDto, l2: LectureDto) {
  return l1.order - l2.order;
}

export const getAllLectures = createSelector(
  getLecturesEntities,
  getSelectedModule,
  (entities, currentModule) => {
    return Object.keys(entities)
      .map(id => entities[id])
      .filter(l => currentModule && l.moduleId === currentModule.id)
      .sort(sortByOrder);
  }
);

export const getLectureTypes = createSelector(
  getLecturesState,
  fromLectures.getLectureTypes
);
