import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learning-path-learners.actions';

import {LearnerCompletedCoursesDto, LearnerForLearningPathDto} from 'src/app/models';

export interface State {
  learners: LearnerForLearningPathDto[];
  loaded: boolean;
  currentLearnerProgress: LearnerCompletedCoursesDto;
}

export const initialState: State = {
  learners: [],
  loaded: false,
  currentLearnerProgress: null
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLearningPathLearnersSuccess, (state, {learners}) => {
    return {
      ...state,
      learners,
      loaded: true
    };
  }),
  on(fromActions.loadLearnerProgressSuccess, (state, {currentLearnerProgress}) => {
    return {
      ...state,
      currentLearnerProgress
    };
  }),
  on(
    fromActions.unloadLearningPathLearners, fromActions.loadLearningPathLearnersFail,
    state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLearningPathLearners = (state: State) => state.learners;
export const getLearningPathLearnersLoaded = (state: State) => state.loaded;
export const getCurrentLearnerProgress = (state: State) => state.currentLearnerProgress;
