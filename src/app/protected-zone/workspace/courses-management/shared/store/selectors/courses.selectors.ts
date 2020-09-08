import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourses from '../reducers/courses.reducer';


const getCourseState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.courses
);

export const getCourses = createSelector(
  getCourseState,
  fromCourses.getCourses
);

export const getTotalCourses = createSelector(
  getCourseState,
  fromCourses.getTotal
);

export const getCoursesLoaded = createSelector(
  getCourseState,
  fromCourses.getCoursesLoaded
);
