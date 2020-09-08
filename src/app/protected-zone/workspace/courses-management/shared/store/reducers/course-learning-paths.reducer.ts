import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/course-learning-paths.actions';

import {CourseLearningPathDto} from 'src/app/models';

export interface State {
  entities: { [id: string]: CourseLearningPathDto };
  selectedPaths: string[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  entities: {},
  selectedPaths: [],
  loaded: false,
  loading: false,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadCourseLearningPaths, state => ({
    ...state,
    loading: true,
    error: null,
    loaded: false
  })),
  on(
    fromActions.loadCourseLearningPathsSuccess,
    (state, {courseLearningPathsVm}) => {
      const selectedPaths = courseLearningPathsVm.courseLearningPathsIds;

      const entities = courseLearningPathsVm.learningPaths.reduce(
        (
          pathsEntities: { [id: string]: CourseLearningPathDto },
          learningPath: CourseLearningPathDto
        ) => {
          return {
            ...pathsEntities,
            [learningPath.id]: learningPath
          };
        },
        {}
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
        selectedPaths
      };
    }
  ),
  on(
    fromActions.updateCourseLearningPathsFail,
    fromActions.loadCourseLearningPathsFail,
    (state, {error}) => ({
      ...state,
      loading: false,
      error
    })
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLearningPathEntities = (state: State) => state.entities;
export const getSelectedLearningPaths = (state: State) => state.selectedPaths;

