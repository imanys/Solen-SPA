import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../actions';

export interface State {
  show: boolean;
}

export const intitialState: State = {
  show: false
};

const featureReducer = createReducer(
  intitialState,
  on(fromActions.openSnackBar, state => ({ ...state, show: true })),
  on(fromActions.closeSnackBar, state => ({ ...state, show: false }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}
