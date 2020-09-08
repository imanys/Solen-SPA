import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearner from '../reducers/learner-info.reducer';


const getDashboardState = createSelector(
  fromFeature.getDashboardState,
  (state: fromFeature.DashboardState) => state.learner
);

export const getLastCourseProgress = createSelector(
  getDashboardState,
  fromLearner.getLastCourseProgress
);

export const getLastCourseProgressLoaded = createSelector(
  getDashboardState,
  fromLearner.getLastCourseProgressLoaded
);
