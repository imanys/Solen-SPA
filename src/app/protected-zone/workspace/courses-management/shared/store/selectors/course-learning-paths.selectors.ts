import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourseLearningPaths from '../reducers/course-learning-paths.reducer';

const getCourseLearningPathsState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.courseLearningPaths
);

export const getPathsEntities = createSelector(
  getCourseLearningPathsState,
  fromCourseLearningPaths.getLearningPathEntities
);

export const getAllLearningPaths = createSelector(
  getPathsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getSelectedPathsIds = createSelector(
  getCourseLearningPathsState,
  fromCourseLearningPaths.getSelectedLearningPaths
);

export const getSelectedLearningPaths = createSelector(
  getPathsEntities,
  getSelectedPathsIds,
  (entities, selectedPaths) => {
    return selectedPaths.map(id => entities[id]);
  }
);

