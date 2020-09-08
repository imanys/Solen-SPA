import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromUser from './user.reducer';


export interface MyProfileState {
  currentUser: fromUser.State;
}

export const reducers: ActionReducerMap<MyProfileState> = {
  currentUser: fromUser.reducer,
};

export const getMyProfileState = createFeatureSelector<MyProfileState>('my-profile');
