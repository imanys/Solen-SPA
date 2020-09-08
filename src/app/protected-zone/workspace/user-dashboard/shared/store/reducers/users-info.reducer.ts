import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/users-info.actions';

import {UserCountInfoDto} from 'src/app/models';

export interface State {
  userCount: UserCountInfoDto;
  loaded: boolean;
}

export const initialState: State = {
  userCount: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadUserCountSuccess, (state, {userCount}) => {
    return {
      ...state,
      userCount,
      loaded: true
    };
  }),
  on(
    fromActions.loadUserCountFail,  fromActions.unloadUserCount, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getUserCount = (state: State) => state.userCount;
export const getUserCountLoaded = (state: State) => state.loaded;
