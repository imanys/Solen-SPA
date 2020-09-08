import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearningPathLearners from '../reducers/learning-path-learners.reducer';


const getLearningPathLearnersState = createSelector(
  fromFeature.getLearningPathsState,
  (state: fromFeature.LearningPathsState) => state.learners
);

export const getLearningPathLearners = createSelector(
  getLearningPathLearnersState,
  fromLearningPathLearners.getLearningPathLearners
);

export const getLearningPathLearnersLoaded = createSelector(
  getLearningPathLearnersState,
  fromLearningPathLearners.getLearningPathLearnersLoaded
);

export const getCurrentLearnerProgress = createSelector(
  getLearningPathLearnersState,
  fromLearningPathLearners.getCurrentLearnerProgress
);
