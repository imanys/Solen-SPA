import {createAction} from '@ngrx/store';

import {LearnerLastCourseProgressDto} from 'src/app/models';


export const loadLastCourseProgress = createAction('[Dashboard] Load Last Course Progress',
  () => ({
    showLoader: true
  }));

export const loadLastCourseProgressSuccess = createAction(
  '[Dashboard] Load Last Course Progress Success',
  (lastCourseProgress: LearnerLastCourseProgressDto) => ({
    lastCourseProgress,
    triggerAction: loadLastCourseProgress.type
  })
);

export const loadLastCourseProgressFail = createAction(
  '[Dashboard] Load Last Course Progress Fail',
  (error: any) => ({
    error,
    triggerAction: loadLastCourseProgress.type
  })
);

export const unloadLastCourseProgress = createAction('[Dashboard] Unload Last Course Progress');
