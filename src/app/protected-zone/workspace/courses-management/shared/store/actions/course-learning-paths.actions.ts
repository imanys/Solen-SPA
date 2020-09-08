import {createAction} from '@ngrx/store';

import {
  GetCourseLearningPathsListVm, UpdateCourseLearningPathsCommand,
} from 'src/app/models/models';

// LOAD COURSE LEARNING PATHS
export const loadCourseLearningPaths = createAction(
  '[Courses Management] Load Course Learning Paths',
  (courseId: string) => ({
    courseId,
    showLoader: true
  })
);

export const loadCourseLearningPathsSuccess = createAction(
  '[Courses Management] Load Course Learning Paths Success',
  (courseLearningPathsVm: GetCourseLearningPathsListVm) => ({
    courseLearningPathsVm,
    triggerAction: loadCourseLearningPaths.type
  })
);

export const loadCourseLearningPathsFail = createAction(
  '[Courses Management] Load Course Learning Paths Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourseLearningPaths.type
  })
);

// UPDATE COURSE LEARNING PATHS
export const updateCourseLearningPaths = createAction(
  '[Courses Management] Update Course Learning Paths',
  (command: UpdateCourseLearningPathsCommand) => ({
    command,
    showLoader: true
  })
);

export const updateCourseLearningPathsSuccess = createAction(
  '[Courses Management] Update Course Learning Paths Success',
  () => ({
    triggerAction: updateCourseLearningPaths.type
  })
);

export const updateCourseLearningPathsFail = createAction(
  '[Courses Management] Update Course Learning Paths Fail',
  (error: any) => ({
    error,
    triggerAction: updateCourseLearningPaths.type
  })
);
