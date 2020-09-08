import {createAction} from '@ngrx/store';

import {CoursesInfoViewModel} from 'src/app/models';


export const loadCoursesInfo = createAction('[Dashboard] Load Courses Info',
  () => ({
    showLoader: true
  }));

export const loadCoursesInfoSuccess = createAction(
  '[Dashboard] Load Courses Info Success',
  (viewModel: CoursesInfoViewModel) => ({
    viewModel,
    triggerAction: loadCoursesInfo.type
  })
);

export const loadCoursesInfoFail = createAction(
  '[Dashboard] Load Courses Info Fail',
  (error: any) => ({
    error,
    triggerAction: loadCoursesInfo.type
  })
);

export const unloadCoursesInfo = createAction('[Dashboard] Unload Courses Info');
