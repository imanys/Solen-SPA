import {createAction} from '@ngrx/store';

import {UserCountInfoDto} from 'src/app/models';


export const loadUserCount = createAction('[Dashboard] Load User Count',
  () => ({
    showLoader: true
  }));

export const loadUserCountSuccess = createAction(
  '[Dashboard] Load User Count Success',
  (userCount: UserCountInfoDto) => ({
    userCount,
    triggerAction: loadUserCount.type
  })
);

export const loadUserCountFail = createAction(
  '[Dashboard] Load User Count Fail',
  (error: any) => ({
    error,
    triggerAction: loadUserCount.type
  })
);

export const unloadUserCount = createAction('[Dashboard] Unload User Count');
