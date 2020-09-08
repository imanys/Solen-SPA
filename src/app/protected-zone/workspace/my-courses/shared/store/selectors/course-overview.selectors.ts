import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourseOverview from '../reducers/course-overview.reducer';

const getCourseOverviewState = createSelector(
  fromFeature.getLearningState,
  (state: fromFeature.LearningState) => state.courseOverview
);

export const getCourseOverview = createSelector(
  getCourseOverviewState,
  fromCourseOverview.getCourseOverview
);

export const getCourseOverviewId = createSelector(
  getCourseOverview,
  course => course && course.id
);

export const getCourseOverviewModules = createSelector(
  getCourseOverview,
  course => course && course.modules
);

export const getCourseOverviewError = createSelector(
  getCourseOverviewState,
  fromCourseOverview.getCourseOverviewError
);
