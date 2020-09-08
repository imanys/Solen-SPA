import {createAction} from '@ngrx/store';

import {InviteMembersCommand, UsersListItemDto} from 'src/app/models';


export const loadUsers = createAction('[Users Management] Load Users',
  () => ({
    showLoader: true
  }));

export const loadUsersSuccess = createAction(
  '[Users Management] Load Users Success',
  (users: UsersListItemDto[]) => ({
    users,
    triggerAction: loadUsers.type
  })
);

export const loadUsersFail = createAction(
  '[Users Management] Load Users Fail',
  (error: any) => ({
    error,
    triggerAction: loadUsers.type
  })
);

export const unloadUsers = createAction('[Users Management] Unload Users');

// INVITE MEMBERS
export const inviteMembers = createAction('[Users Management] Invite Members',
  (command: InviteMembersCommand) => ({
    command,
    showLoader: true
  }));

export const inviteMembersSuccess = createAction(
  '[Users Management] Invite Members Success',
  () => ({triggerAction: inviteMembers.type})
);

export const inviteMembersFail = createAction(
  '[Users Management] Invite Members Fail',
  (error: any) => ({
    error,
    triggerAction: inviteMembers.type
  })
);
