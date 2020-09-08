import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLoadingIndicator from '../reducers/loading-indicator.reducer';

export const getLoadingIndicatorState = createSelector(
  fromFeature.getUiState,
  (state: fromFeature.UiState) => state.loadingIndicator
);

export const isLoadingSpinnerActive = createSelector(
  getLoadingIndicatorState,
  fromLoadingIndicator.isLoadingSpinnerActive
);
