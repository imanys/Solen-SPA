import {createAction} from '@ngrx/store';

import {StorageInfoDto} from 'src/app/models';


export const loadStorageInfo = createAction('[Dashboard] Load Storage Info',
  () => ({
    showLoader: true
  }));

export const loadStorageInfoSuccess = createAction(
  '[Dashboard] Load Storage Info Success',
  (storageInfo: StorageInfoDto) => ({
    storageInfo,
    triggerAction: loadStorageInfo.type
  })
);

export const loadStorageInfoFail = createAction(
  '[Dashboard] Load Storage Info Fail',
  (error: any) => ({
    error,
    triggerAction: loadStorageInfo.type
  })
);

export const unloadStorageInfo = createAction('[Dashboard] Unload Storage Info');
