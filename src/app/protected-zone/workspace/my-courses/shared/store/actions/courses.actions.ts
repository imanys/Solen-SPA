import { createAction } from '@ngrx/store';

import {LearnerCoursesListResult} from 'src/app/models';

// load courses
export const loadCourses = createAction('[My courses] Load Courses', () => ({
  showLoader: true
}));

export const loadCoursesSuccess = createAction(
  '[My courses] Load Courses Success',
  (queryResult: LearnerCoursesListResult) => ({
    queryResult,
    triggerAction: loadCourses.type
  })
);

export const loadCoursesFail = createAction(
  '[My courses] Load Courses Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourses.type
  })
);

// unload courses
export const unLoadCourses = createAction('[My courses] UnLoad Courses');


