import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learning-paths.actions';

import {LearningPathDto} from 'src/app/models';

export interface State {
  learningPaths: LearningPathDto[];
}

export const initialState: State = {
  learningPaths: []
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLearningPathsSuccess, (state, {learningPaths}) => {
    return {
      ...state,
      learningPaths
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLearningPaths = (state: State) => state.learningPaths;
