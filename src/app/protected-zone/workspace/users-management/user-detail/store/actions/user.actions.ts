import {createAction} from '@ngrx/store';

import {BlockUserCommand, UnblockUserCommand, UpdateUserLearningPathCommand, UpdateUserRolesCommand, UserViewModel} from 'src/app/models';


export const loadUser = createAction('[Users Management] Load User',
  (userId: string) => ({
    userId,
    showLoader: true
  }));

export const loadUserSuccess = createAction(
  '[Users Management] Load User Success',
  (viewModel: UserViewModel) => ({
    viewModel,
    triggerAction: loadUser.type
  })
);

export const loadUserFail = createAction(
  '[Users Management] Load User Fail',
  (error: any) => ({
    error,
    triggerAction: loadUser.type
  })
);

// UPDATE USER LEARNING PATH
export const updateUserLearningPath = createAction('[Users Management] Update User Learning Path',
  (command: UpdateUserLearningPathCommand) => ({
    command,
    showLoader: true
  }));

export const updateUserSuccess = createAction(
  '[Users Management] Update User Learning Path Success',
  () => ({triggerAction: updateUserLearningPath.type})
);

export const updateUserFail = createAction(
  '[Users Management] Update User Learning Path Fail',
  (error: any) => ({
    error,
    triggerAction: updateUserLearningPath.type
  })
);

// UPDATE USER ROLES
export const updateUserRoles = createAction('[Users Management] Update User Roles',
  (command: UpdateUserRolesCommand) => ({
    command,
    showLoader: true
  }));

export const updateUserRolesSuccess = createAction(
  '[Users Management] Update User Roles Success',
  () => ({triggerAction: updateUserRoles.type})
);

export const updateUserRolesFail = createAction(
  '[Users Management] Update User Roles Fail',
  (error: any) => ({
    error,
    triggerAction: updateUserRoles.type
  })
);

// BLOCK USER
export const blockUser = createAction('[Users Management] Block User',
  (command: BlockUserCommand) => ({
    command,
    showLoader: true
  }));

export const blockUserSuccess = createAction(
  '[Users Management] Block User Success',
  () => ({triggerAction: blockUser.type})
);

export const blockUserFail = createAction(
  '[Users Management] Block User Fail',
  (error: any) => ({
    error,
    triggerAction: blockUser.type
  })
);

// UNBLOCK USER
export const unblockUser = createAction('[Users Management] Unblock User',
  (command: UnblockUserCommand) => ({
    command,
    showLoader: true
  }));

export const unblockUserSuccess = createAction(
  '[Users Management] Unblock User Success',
  () => ({triggerAction: unblockUser.type})
);

export const unblockUserFail = createAction(
  '[Users Management] Unblock User Fail',
  (error: any) => ({
    error,
    triggerAction: unblockUser.type
  })
);
