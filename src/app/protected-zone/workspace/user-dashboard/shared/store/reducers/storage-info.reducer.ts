import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/storage-info.actions';

import {StorageInfoDto} from 'src/app/models';

export interface State {
  storageInfo: StorageInfoDto;
  loaded: boolean;
}

export const initialState: State = {
  storageInfo: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadStorageInfoSuccess, (state, {storageInfo}) => {
    return {
      ...state,
      storageInfo,
      loaded: true
    };
  }),
  on(
    fromActions.loadStorageInfoFail,  fromActions.unloadStorageInfo, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getStorageInfo = (state: State) => state.storageInfo;
export const getStorageInfoLoaded = (state: State) => state.loaded;
