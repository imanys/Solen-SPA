import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/users.actions';

import {UsersListItemDto} from 'src/app/models';

export interface State {
  users: UsersListItemDto[];
  loaded: boolean;
}

export const initialState: State = {
  users: [],
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadUsersSuccess, (state, {users}) => {
    return {
      ...state,
      users,
      loaded: true
    };
  }),
  on(
    fromActions.loadUsersFail,  fromActions.unloadUsers, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getUsers = (state: State) => state.users;
export const getUsersLoaded = (state: State) => state.loaded;
