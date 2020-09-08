import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromUsers from './users.reducer';
import * as fromLearningPaths from './learning-paths.reducer';

export interface UsersState {
  users: fromUsers.State;
  learningPaths: fromLearningPaths.State;
}

export const reducers: ActionReducerMap<UsersState> = {
  users: fromUsers.reducer,
  learningPaths: fromLearningPaths.reducer
};

export const getUsersState = createFeatureSelector<UsersState>('users');
