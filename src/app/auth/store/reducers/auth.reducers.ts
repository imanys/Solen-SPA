import {createReducer, on, Action} from '@ngrx/store';

import * as fromAuth from '../actions/auth.actions';
import {LoggedUserDto} from 'src/app/models';

export interface State {
  loggedUser: LoggedUserDto | null;
  logging: boolean;
  error: any;
  userLoaded: boolean;
}

export const initialState: State = {
  loggedUser: null,
  logging: false,
  error: null,
  userLoaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromAuth.logUser, state => ({
    ...state,
    logging: true,
    loggingError: null
  })),
  on(
    fromAuth.logUserSuccess,
    (state, {viewModel}) => {
      const {loggedUser} = viewModel;
      return {
        ...state,
        loggedUser,
        userLoaded: true,
        logging: false
      };
    }
  ),
  on(
    fromAuth.getCurrentUserSuccess,
    (state, {loggedUser}) => {
      return {
        ...state,
        loggedUser,
        userLoaded: true,
        logging: false
      };
    }
  ),
  on(fromAuth.logUserFail, (state, {error}) => ({
    ...state,
    userLoaded: false,
    logging: false,
    error
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLoggedUser = (state: State) => state.loggedUser;
export const getUserLoaded = (state: State) => state.userLoaded;
export const getLogging = (state: State) => state.logging;
export const getLoggingError = (state: State) => state.error;
