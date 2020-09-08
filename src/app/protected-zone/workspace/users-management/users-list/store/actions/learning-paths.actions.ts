import {createAction} from '@ngrx/store';

import {LearningPathDto} from 'src/app/models';


export const loadLearningPaths = createAction('[Users Management] Load Learning Paths',
  () => ({
    showLoader: true
  }));

export const loadLearningPathsSuccess = createAction(
  '[Users Management] Load Learning Paths Success',
  (learningPaths: LearningPathDto[]) => ({
    learningPaths,
    triggerAction: loadLearningPaths.type
  })
);

export const loadLearningPathsFail = createAction(
  '[Users Management] Load Learning Paths Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearningPaths.type
  })
);
