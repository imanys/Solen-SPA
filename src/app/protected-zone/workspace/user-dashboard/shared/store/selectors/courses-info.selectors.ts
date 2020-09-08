import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourses from '../reducers/courses-info.reducer';


const getDashboardState = createSelector(
  fromFeature.getDashboardState,
  (state: fromFeature.DashboardState) => state.courses
);

export const getLastCreatedCourse = createSelector(
  getDashboardState,
  fromCourses.getLastCreatedCourse
);

export const getLastPublishedCourse = createSelector(
  getDashboardState,
  fromCourses.getLastPublishedCourse
);

export const getCourseCount = createSelector(
  getDashboardState,
  fromCourses.getCourseCount
);

export const getCoursesInfosLoaded = createSelector(
  getDashboardState,
  fromCourses.getCoursesInfosLoaded
);
