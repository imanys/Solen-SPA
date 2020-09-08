import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSnack from './snackbar.reducer';
import * as fromLoadingIndicator from './loading-indicator.reducer';

export interface UiState {
  snackbar: fromSnack.State;
  loadingIndicator: fromLoadingIndicator.State;
}

export const reducers: ActionReducerMap<UiState> = {
  snackbar: fromSnack.reducer,
  loadingIndicator: fromLoadingIndicator.reducer
};

export const getUiState = createFeatureSelector<UiState>('shared');
