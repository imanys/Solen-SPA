import {createAction} from '@ngrx/store';

import {CreateLearningPathCommand, LearningPathDto, UpdateLearningPathCommand} from 'src/app/models';


export const loadLearningPaths = createAction('[Learning Paths] Load Learning Paths',
  () => ({
    showLoader: true
  }));

export const loadLearningPathsSuccess = createAction(
  '[Learning Paths] Load Learning Paths Success',
  (learningPaths: LearningPathDto[]) => ({
    learningPaths,
    triggerAction: loadLearningPaths.type
  })
);

export const loadLearningPathsFail = createAction(
  '[Learning Paths] Load Learning Paths Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearningPaths.type
  })
);

export const unloadLearningPaths = createAction('[Learning Paths] unload Learning Paths');

// UPDATE LEARNING PATH INFO
export const updateLearningPathInfo = createAction(
  '[Learning Paths] Update Learning Path Info',
  (command: UpdateLearningPathCommand) => ({command, showLoader: true})
);

export const updateLearningPathInfoSuccess = createAction(
  '[Learning Paths] Update Learning Path Info Success',
  (learningPath: LearningPathDto) => ({learningPath, triggerAction: updateLearningPathInfo.type})
);

export const updateLearningPathInfoFail = createAction(
  '[Learning Paths] Update Learning Path Info Fail',
  (error: any) => ({
    error,
    triggerAction: updateLearningPathInfo.type
  })
);

// DELETE LEARNING PATH
export const deleteLearningPath = createAction(
  '[Learning Paths] Delete Learning Path',
  (learningPathId: string) => ({learningPathId, showLoader: true})
);

export const deleteLearningPathSuccess = createAction(
  '[Learning Paths] Delete Learning Path Success',
  () => ({triggerAction: deleteLearningPath.type})
);

export const deleteLearningPathFail = createAction(
  '[Learning Paths] Delete Learning Path Fail',
  (error: any) => ({
    error,
    triggerAction: deleteLearningPath.type
  })
);

// CREATE LEARNING PATH
export const createLearningPath = createAction(
  '[Learning Paths] Create Learning Path',
  (command: CreateLearningPathCommand) => ({command, showLoader: true})
);

export const createLearningPathSuccess = createAction(
  '[Learning Paths] Create Learning Path Success',
  () => ({triggerAction: createLearningPath.type})
);

export const createLearningPathFail = createAction(
  '[Learning Paths] Create Learning Path Fail',
  (error: any) => ({
    error,
    triggerAction: createLearningPath.type
  })
);
