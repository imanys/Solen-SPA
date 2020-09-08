import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../actions/loading-indicator.actions';

export interface State {
  active: number;
  actionsInProgress: any[];
}
const initialState: State = {
  active: 0,
  actionsInProgress: []
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.showSpinner, (state, { action }) => {
    const isActionAlreadyInProgress = state.actionsInProgress.filter(
      (currentAction: any) => currentAction === action.type
    ).length;

    if (isActionAlreadyInProgress) {
      return state;
    }
    const actionsInProgress = [...state.actionsInProgress, action.type];
    return { ...state, active: actionsInProgress.length, actionsInProgress };
  }),
  on(fromActions.hideSpinner, (state, { action }) => {
    const actionsInProgress = action.triggerAction
      ? state.actionsInProgress.filter(
          (currentAction: any) => currentAction !== action.triggerAction
        )
      : state.actionsInProgress;
    return {
      ...state,
      actionsInProgress,
      active: state.active > 0 ? actionsInProgress.length : 0
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const isLoadingSpinnerActive = (state: State) => state.active > 0;
