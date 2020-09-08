import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCourses from './courses.reducer';
import * as fromOverview from './course-overview.reducer';
import * as fromFilters from './courses-filters.reducer';

export interface LearningState {
  courses: fromCourses.State;
  courseOverview: fromOverview.State;
  coursesFilters: fromFilters.State;
}

export const reducers: ActionReducerMap<LearningState> = {
  courses: fromCourses.reducer,
  courseOverview: fromOverview.reducer,
  coursesFilters: fromFilters.reducer
};

export const getLearningState = createFeatureSelector<LearningState>('my-courses');
