import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';



const getMyProfileState = createSelector(
  fromFeature.getMyProfileState,
  (state: fromFeature.MyProfileState) => state.currentUser
);

export const getCurrentUserInfo = createSelector(
  getMyProfileState,
  fromUser.getCurrentUserInfo
);

export const getCurrentUserInfoLoaded = createSelector(
  getMyProfileState,
  fromUser.getCurrentUserInfoLoaded
);
