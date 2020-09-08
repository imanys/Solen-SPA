import {createAction} from '@ngrx/store';
import {CoursesFilter, CoursesFiltersViewModel} from '../../../../../../models';


// Load Filters
export const loadCoursesFilters = createAction(
  '[Courses Management] Load Courses Filters',
  () => ({showLoader: true})
);

export const loadCoursesFiltersSuccess = createAction(
  '[Courses Management] Load Courses Filters Success',
  (filters: CoursesFiltersViewModel) => ({
    filters,
    triggerAction: loadCoursesFilters.type
  })
);

export const loadCoursesFiltersFail = createAction(
  '[Courses Management] Load Courses Fail',
  (error: any) => ({
    error,
    triggerAction: loadCoursesFilters.type
  })
);

// Current Filter
export const updateCurrentFilter = createAction(
  '[Courses Management] Update Courses Current Filter',
  (currentFilter: CoursesFilter) => ({currentFilter})
);

export const resetCurrentFilter = createAction(
  '[Courses Management] Reset Courses Current Filter'
);

