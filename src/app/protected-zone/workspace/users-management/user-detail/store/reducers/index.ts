import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromUser from './user.reducer';

export interface UserState {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<UserState> = {
  user: fromUser.reducer,
};

export const getUsersState = createFeatureSelector<UserState>('user-detail');
