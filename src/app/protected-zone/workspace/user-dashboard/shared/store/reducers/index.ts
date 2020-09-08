import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromStorage from './storage-info.reducer';
import * as fromUsers from './users-info.reducer';
import * as fromLearner from './learner-info.reducer';
import * as fromCourses from './courses-info.reducer';
import * as fromLearningPaths from './learning-paths.reducer';


export interface DashboardState {
  storage: fromStorage.State;
  users: fromUsers.State;
  learner: fromLearner.State;
  courses: fromCourses.State;
  learningPaths: fromLearningPaths.State;
}

export const reducers: ActionReducerMap<DashboardState> = {
  storage: fromStorage.reducer,
  users: fromUsers.reducer,
  learner: fromLearner.reducer,
  courses: fromCourses.reducer,
  learningPaths: fromLearningPaths.reducer
};

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');
