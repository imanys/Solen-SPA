import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearningPaths from '../reducers/learning-paths.reducer';
import * as fromRouter from 'src/app/app-routing/store/reducers';

import {LearningPathDto} from 'src/app/models';

const getLearningPathsState = createSelector(
  fromFeature.getLearningPathsState,
  (state: fromFeature.LearningPathsState) => state.learningPaths
);

export const getLearningPathsEntities = createSelector(
  getLearningPathsState,
  fromLearningPaths.getLearningPathsEntities
);

export const getSelectedLearningPath = createSelector(
  getLearningPathsEntities,
  fromRouter.getRouterState,
  (entities, router): LearningPathDto => {
    return router && router.state && entities[router.state.params.learningPathId];
  }
);


export const getAllLearningPaths = createSelector(
  getLearningPathsEntities,
  entities => {
    return entities && Object.keys(entities).map(id => entities[id]);
  }
);

export const getLearningPathsLoaded = createSelector(
  getLearningPathsState,
  fromLearningPaths.getLearningPathsLoaded
);
