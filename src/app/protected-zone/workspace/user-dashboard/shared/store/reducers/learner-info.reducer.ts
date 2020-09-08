import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learner-info.actions';

import {LearnerLastCourseProgressDto} from 'src/app/models';

export interface State {
  lastCourseProgress: LearnerLastCourseProgressDto;
  loaded: boolean;
}

export const initialState: State = {
  lastCourseProgress: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLastCourseProgressSuccess, (state, {lastCourseProgress}) => {
    return {
      ...state,
      lastCourseProgress,
      loaded: true
    };
  }),
  on(
    fromActions.loadLastCourseProgressFail,  fromActions.unloadLastCourseProgress, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLastCourseProgress = (state: State) => state.lastCourseProgress;
export const getLastCourseProgressLoaded = (state: State) => state.loaded;
