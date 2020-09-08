import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromLearningPaths from './learning-paths.reducer';
import * as fromLearningPathCourses from './learning-path-courses.reducer';
import * as fromLearningPathLearners from './learning-path-learners.reducer';

export interface LearningPathsState {
  learningPaths: fromLearningPaths.State;
  courses: fromLearningPathCourses.State;
  learners: fromLearningPathLearners.State;
}

export const reducers: ActionReducerMap<LearningPathsState> = {
  learningPaths: fromLearningPaths.reducer,
  courses: fromLearningPathCourses.reducer,
  learners: fromLearningPathLearners.reducer
};

export const getLearningPathsState = createFeatureSelector<LearningPathsState>('learning-paths');
