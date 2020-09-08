import { createSelector } from '@ngrx/store';

import { JwtHelperService } from '@auth0/angular-jwt';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducers';

export const getAuthState = createSelector(
  fromFeature.getAuthFeatureState,
  (state: fromFeature.AuthState) => state.auth
);

export const getLogging = createSelector(
  getAuthState,
  fromAuth.getLogging
);

export const getLoggedUser = createSelector(
  getAuthState,
  fromAuth.getLoggedUser
);

export const getIsUserLogged = createSelector(
  getAuthState,
  authState => {
    const { loggedUser } = authState;
    return !!loggedUser;
  }
);


export const getUserLoaded = createSelector(
  getAuthState,
  fromAuth.getUserLoaded
);
