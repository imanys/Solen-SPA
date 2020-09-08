import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learning-paths.actions';

import {LearningPathDto} from 'src/app/models';

export interface State {
  entities: { [id: string]: LearningPathDto };
  loaded: boolean;
}

export const initialState: State = {
  entities: {},
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLearningPathsSuccess, (state, {learningPaths}) => {
    const entities = learningPaths.reduce(
      (pathsEntities: { [id: string]: LearningPathDto }, path: LearningPathDto) => {
        return {
          ...pathsEntities,
          [path.id]: path
        };
      },
      {}
    );

    return {
      ...state,
      entities,
      loaded: true
    };
  }),
  on(fromActions.updateLearningPathInfoSuccess, (state, {learningPath}) => {
    const entities = {
      ...state.entities,
      [learningPath.id]: learningPath,
    };

    return {
      ...state,
      entities,
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

export const getLearningPathsEntities = (state: State) => state.entities;
export const getLearningPathsLoaded = (state: State) => state.loaded;
