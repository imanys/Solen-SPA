import {createAction} from '@ngrx/store';

import {LearningPathForDashboardDto} from 'src/app/models';


export const loadLearningPaths = createAction('[Dashboard] Load Learning Paths',
  () => ({
    showLoader: true
  }));

export const loadLearningPathsSuccess = createAction(
  '[Dashboard] Load Learning Paths Success',
  (learningPaths: LearningPathForDashboardDto[]) => ({
    learningPaths,
    triggerAction: loadLearningPaths.type
  })
);

export const loadLearningPathsFail = createAction(
  '[Dashboard] Load Learning Paths Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearningPaths.type
  })
);

export const unloadLearningPaths = createAction('[Dashboard] Unload Learning Paths');
