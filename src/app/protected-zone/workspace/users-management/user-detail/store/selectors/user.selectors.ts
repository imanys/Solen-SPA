import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';


const getUserState = createSelector(
  fromFeature.getUsersState,
  (state: fromFeature.UserState) => state.user
);

export const getUser = createSelector(
  getUserState,
  fromUser.getUser
);

export const getLearningPaths = createSelector(
  getUserState,
  fromUser.getLearningPaths
);

export const getRoles = createSelector(
  getUserState,
  fromUser.getRoles
);
