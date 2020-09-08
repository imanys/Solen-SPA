import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export interface AuthState {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer
};

export const getAuthFeatureState = createFeatureSelector<AuthState>('auth');
