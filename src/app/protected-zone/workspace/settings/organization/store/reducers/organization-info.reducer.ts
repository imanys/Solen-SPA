import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/organization-info.actions';


export interface State {
  organizationName: string;
  subscriptionPlan: string;
  maxStorage: number;
  currentStorage: number;
  usersCount: number;
  loaded: boolean;
}

export const initialState: State = {
  organizationName: null,
  subscriptionPlan: null,
  maxStorage: 0,
  currentStorage: 0,
  usersCount: 0,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadOrganizationInfoSuccess, (state, {viewModel}) => {
    const organizationName = viewModel.organizationName;
    const subscriptionPlan = viewModel.subscriptionPlan;
    const maxStorage = viewModel.maxStorage;
    const currentStorage = viewModel.currentStorage;
    const usersCount = viewModel.currentUsersCount;

    return {
      ...state,
      organizationName,
      subscriptionPlan,
      maxStorage,
      currentStorage,
      usersCount,
      loaded: true
    };
  }),
  on(fromActions.loadOrganizationInfoFail, state => ({
    ...state,
    loaded: false
  })),
  on(fromActions.unloadOrganizationInfo, state => ({
    ...state,
    loaded: false
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getOrganizationName = (state: State) => state.organizationName;
export const getSubscriptionPlan = (state: State) => state.subscriptionPlan;
export const getMaxStorage = (state: State) => state.maxStorage;
export const getCurrentStorage = (state: State) => state.currentStorage;
export const getUsersCount = (state: State) => state.usersCount;
export const getOrganizationInfoLoaded = (state: State) => state.loaded;

