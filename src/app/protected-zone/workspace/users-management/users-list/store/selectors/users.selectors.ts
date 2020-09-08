import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users.reducer';


const getUsersState = createSelector(
  fromFeature.getUsersState,
  (state: fromFeature.UsersState) => state.users
);

export const getUsers = createSelector(
  getUsersState,
  fromUsers.getUsers
);

export const getUsersLoaded = createSelector(
  getUsersState,
  fromUsers.getUsersLoaded
);
