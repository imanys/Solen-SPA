import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromOrganization from './organization-info.reducer';

export interface OrganizationInfoState {
  organizationInfo: fromOrganization.State;
}

export const reducers: ActionReducerMap<OrganizationInfoState> = {
  organizationInfo: fromOrganization.reducer
};

export const getOrganizationInfoState = createFeatureSelector<OrganizationInfoState>('organization-settings');
