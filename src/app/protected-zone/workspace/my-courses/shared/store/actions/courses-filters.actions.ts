import {createAction} from '@ngrx/store';
import {LearnerCoursesFilter, LearnerCoursesFiltersViewModel} from 'src/app/models';


// Load Filters
export const loadCoursesFilters = createAction(
  '[My courses] Load Courses Filters',
  () => ({showLoader: true})
);

export const loadCoursesFiltersSuccess = createAction(
  '[My courses] Load Courses Filters Success',
  (filters: LearnerCoursesFiltersViewModel) => ({
    filters,
    triggerAction: loadCoursesFilters.type
  })
);

export const loadCoursesFiltersFail = createAction(
  '[My courses] Load Courses Fail',
  (error: any) => ({
    error,
    triggerAction: loadCoursesFilters.type
  })
);

// Current Filter
export const updateCurrentFilter = createAction(
  '[My courses] Update Courses Current Filter',
  (currentFilter: LearnerCoursesFilter) => ({currentFilter})
);

export const resetCurrentFilter = createAction(
  '[My courses] Reset Courses Current Filter'
);

