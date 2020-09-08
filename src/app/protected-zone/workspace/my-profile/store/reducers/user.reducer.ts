import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/user.actions';

import {UserForProfileDto} from 'src/app/models';

export interface State {
  currentUser: UserForProfileDto;
  loaded: boolean;
}

export const initialState: State = {
  currentUser: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadCurrentUserInfoSuccess, fromActions.updateCurrentUserInfoSuccess,
    (state, {currentUser}) => {

      return {
        ...state,
        currentUser,
        loaded: true
      };
    }),
  on(
    fromActions.loadCurrentUserInfoFail, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCurrentUserInfo = (state: State) => state.currentUser;
export const getCurrentUserInfoLoaded = (state: State) => state.loaded;
