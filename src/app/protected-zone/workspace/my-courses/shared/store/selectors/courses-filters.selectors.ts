import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFilters from '../reducers/courses-filters.reducer';


const getFiltersState = createSelector(
  fromFeature.getLearningState,
  (state: fromFeature.LearningState) => state.coursesFilters
);

export const getOrderBys = createSelector(
  getFiltersState,
  fromFilters.getOrderBys
);

export const getAuthors = createSelector(
  getFiltersState,
  fromFilters.getAuthors
);

export const getCoursesFiltersLoaded = createSelector(
  getFiltersState,
  fromFilters.getCoursesFiltersLoaded
);

export const getCurrentFilter = createSelector(
  getFiltersState,
  fromFilters.getCurrentFilter
);
