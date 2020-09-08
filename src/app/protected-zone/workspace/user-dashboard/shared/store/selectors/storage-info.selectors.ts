import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromStorage from '../reducers/storage-info.reducer';


const getDashboardState = createSelector(
  fromFeature.getDashboardState,
  (state: fromFeature.DashboardState) => state.storage
);

export const getStorageInfo = createSelector(
  getDashboardState,
  fromStorage.getStorageInfo
);

export const getStorageInfoLoaded = createSelector(
  getDashboardState,
  fromStorage.getStorageInfoLoaded
);
