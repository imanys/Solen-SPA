import {createAction} from '@ngrx/store';

import {UpdateCurrentUserInfoCommand, UpdateCurrentUserPasswordCommand, UserForProfileDto} from 'src/app/models';


export const loadCurrentUserInfo = createAction('[My Profile] Load Current User Info',
  () => ({
    showLoader: true
  }));

export const loadCurrentUserInfoSuccess = createAction(
  '[My Profile] Load Current User Success',
  (currentUser: UserForProfileDto) => ({
    currentUser,
    triggerAction: loadCurrentUserInfo.type
  })
);

export const loadCurrentUserInfoFail = createAction(
  '[My Profile] Load Current User Fail',
  (error: any) => ({
    error,
    triggerAction: loadCurrentUserInfo.type
  })
);


// UPDATE CURRENT USER INFO
export const updateCurrentUserInfo = createAction(
  '[My Profile] Update Current User Info',
  (command: UpdateCurrentUserInfoCommand) => ({command, showLoader: true})
);

export const updateCurrentUserInfoSuccess = createAction(
  '[My Profile] Update Current User Info Success',
  (currentUser: UserForProfileDto) => ({currentUser, triggerAction: updateCurrentUserInfo.type})
);

export const updateCurrentUserInfoFail = createAction(
  '[My Profile] Update Current User Info Fail',
  (error: any) => ({
    error,
    triggerAction: updateCurrentUserInfo.type
  })
);

// UPDATE CURRENT USER PASSWORD
export const updateCurrentUserPassword = createAction(
  '[My Profile] Update Current User Password',
  (command: UpdateCurrentUserPasswordCommand) => ({command, showLoader: true})
);

export const updateCurrentUserPasswordSuccess = createAction(
  '[My Profile] Update Current User Password Success',
  () => ({triggerAction: updateCurrentUserPassword.type})
);

export const updateCurrentUserPasswordFail = createAction(
  '[My Profile] Update Current User Password Fail',
  (error: any) => ({
    error,
    triggerAction: updateCurrentUserPassword.type
  })
);
