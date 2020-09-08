import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromOrganizationInfo from '../reducers/organization-info.reducer';


const getOrganizationInfoState = createSelector(
  fromFeature.getOrganizationInfoState,
  (state: fromFeature.OrganizationInfoState) => state.organizationInfo
);

export const getOrganizationName = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getOrganizationName
);

export const getSubscriptionPlan = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getSubscriptionPlan
);

export const getMaxStorage = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getMaxStorage
);

export const getCurrentStorage = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getCurrentStorage
);

export const getUsersCount = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getUsersCount
);

export const getOrganizationInfoLoaded = createSelector(
  getOrganizationInfoState,
  fromOrganizationInfo.getOrganizationInfoLoaded
);
