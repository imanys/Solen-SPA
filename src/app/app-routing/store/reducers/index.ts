import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import * as fromRouter from './router.reducer';

export interface RouterState {
  routerReducer: RouterReducerState<fromRouter.RouterStateUrl>;
}

export const reducers: ActionReducerMap<RouterState> = {
  routerReducer
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<fromRouter.RouterStateUrl>
>('routerReducer');

export * from './router.reducer';
