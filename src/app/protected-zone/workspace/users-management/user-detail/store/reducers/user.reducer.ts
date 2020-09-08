import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/user.actions';

import {LearningPathForUserDto, UserDto, RoleForUserDto} from 'src/app/models';

export interface State {
  user: UserDto;
  learningPaths: LearningPathForUserDto[];
  roles: RoleForUserDto[];
}

export const initialState: State = {
  user: null,
  learningPaths: [],
  roles: []
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadUserSuccess, (state, {viewModel}) => {
    const {user, learningPaths, roles} = viewModel;

    return {
      ...state,
      user,
      learningPaths,
      roles
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getUser = (state: State) => state.user;
export const getLearningPaths = (state: State) => state.learningPaths;
export const getRoles = (state: State) => state.roles;
