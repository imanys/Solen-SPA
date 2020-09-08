import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearningPaths from '../reducers/learning-paths.reducer';


const getUsersState = createSelector(
  fromFeature.getUsersState,
  (state: fromFeature.UsersState) => state.learningPaths
);

export const getLearningPaths = createSelector(
  getUsersState,
  fromLearningPaths.getLearningPaths
);

