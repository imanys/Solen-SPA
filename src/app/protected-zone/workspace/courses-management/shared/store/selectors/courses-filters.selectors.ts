import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFilters from '../reducers/courses-filters.reducer';


const getFiltersState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.coursesFilters
);

export const getOrderBys = createSelector(
  getFiltersState,
  fromFilters.getOrderBys
);

export const getLearningPaths = createSelector(
  getFiltersState,
  fromFilters.getLearningPaths
);

export const getAuthors = createSelector(
  getFiltersState,
  fromFilters.getAuthors
);

export const getStatus = createSelector(
  getFiltersState,
  fromFilters.getStatus
);

export const getCoursesFiltersLoaded = createSelector(
  getFiltersState,
  fromFilters.getCoursesFiltersLoaded
);

export const getCurrentFilter = createSelector(
  getFiltersState,
  fromFilters.getCurrentFilter
);
