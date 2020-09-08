import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearningPaths from '../reducers/learning-paths.reducer';


const getDashboardState = createSelector(
  fromFeature.getDashboardState,
  (state: fromFeature.DashboardState) => state.learningPaths
);

export const getLearningPaths = createSelector(
  getDashboardState,
  fromLearningPaths.getLearningPaths
);

export const getLearningPathsLoaded = createSelector(
  getDashboardState,
  fromLearningPaths.getLearningPathsLoaded
);
