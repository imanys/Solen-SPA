import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learning-paths.actions';

import {LearningPathForDashboardDto} from 'src/app/models';

export interface State {
  learningPaths: LearningPathForDashboardDto[];
  loaded: boolean;
}

export const initialState: State = {
  learningPaths: [],
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLearningPathsSuccess, (state, {learningPaths}) => {
    return {
      ...state,
      learningPaths,
      loaded: true
    };
  }),
  on(
    fromActions.loadLearningPathsFail,  fromActions.unloadLearningPaths, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLearningPaths = (state: State) => state.learningPaths;
export const getLearningPathsLoaded = (state: State) => state.loaded;
