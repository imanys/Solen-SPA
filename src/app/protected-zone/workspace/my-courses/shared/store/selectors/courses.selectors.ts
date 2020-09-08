import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourses from '../reducers/courses.reducer';


const getCourseState = createSelector(
  fromFeature.getLearningState,
  (state: fromFeature.LearningState) => state.courses
);

export const getCourses = createSelector(
  getCourseState,
  fromCourses.getCourses
);

export const getCoursesProgress = createSelector(
  getCourseState,
  fromCourses.getProgress
);


export const getTotalCourses = createSelector(
  getCourseState,
  fromCourses.getTotalCourses
);

export const getCoursesLoaded = createSelector(
  getCourseState,
  fromCourses.getCoursesLoaded
);

export const getCoursesError = createSelector(
  getCourseState,
  fromCourses.getCoursesError
);
