import {createAction} from '@ngrx/store';

import {LoginUserQuery, LoggedUserViewModel, LoggedUserDto} from 'src/app/models/models';

export const logUser = createAction(
  '[Auth] Log User',
  (query: LoginUserQuery) => ({
    query,
    showLoader: true
  })
);

export const logUserSuccess = createAction(
  '[Auth] Log User Success',
  (viewModel: LoggedUserViewModel) => ({
    viewModel,
    triggerAction: logUser.type
  })
);

export const logUserFail = createAction(
  '[Auth] Log User Fail',
  (error: any) => ({
    error,
    triggerAction: logUser.type
  })
);

export const getCurrentUser = createAction('[Auth] Get Current User', () => ({
  showLoader: true
}));

export const getCurrentUserSuccess = createAction(
  '[Auth] Get Current User Success',
  (loggedUser: LoggedUserDto) => ({
    loggedUser,
    triggerAction: getCurrentUser.type
  })
);

export const getCurrentUserFail = createAction(
  '[Auth] Get Current User Fail',
  (error: any) => ({
    error,
    triggerAction: getCurrentUser.type
  })
);


// LOG OUT
export const logOut = createAction('[Auth] Log Out');

