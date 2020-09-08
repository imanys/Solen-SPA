import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users-info.reducer';


const getDashboardState = createSelector(
  fromFeature.getDashboardState,
  (state: fromFeature.DashboardState) => state.users
);

export const getUserCount = createSelector(
  getDashboardState,
  fromUsers.getUserCount
);

export const getUserCountLoaded = createSelector(
  getDashboardState,
  fromUsers.getUserCountLoaded
);
