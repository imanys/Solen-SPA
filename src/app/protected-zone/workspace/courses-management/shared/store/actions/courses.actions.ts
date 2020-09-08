import {createAction} from '@ngrx/store';

import {
  CourseDto,
  CreateCourseCommand,
  CoursesListResult
} from 'src/app/models/models';


// load courses
export const loadCourses = createAction('[Courses Management] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Courses Management] Load Courses Success',
  (queryResult: CoursesListResult) => ({
    queryResult,
    triggerAction: loadCourses.type
  })
);

export const loadCoursesFail = createAction(
  '[Courses Management] Load Courses Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourses.type
  })
);

// DELETE COURSE
export const deleteCourse = createAction(
  '[Courses Management] Delete Course',
  (courseId: string) => ({courseId, showLoader: true})
);

export const deleteCourseSuccess = createAction(
  '[Courses Management] Delete Course Success',
  (courseId: string) => ({
    courseId,
    triggerAction: deleteCourse.type
  })
);

export const deleteCourseFail = createAction(
  '[Courses Management] Delete Course Fail',
  (error: any) => ({
    error,
    triggerAction: deleteCourse.type
  })
);

// CREATE COURSE
export const createCourse = createAction(
  '[Courses Management] Create Course',
  (command: CreateCourseCommand) => ({command, showLoader: true})
);

export const createCourseSuccess = createAction(
  '[Courses Management] Create Course Success',
  (course: CourseDto) => ({
    course,
    triggerAction: createCourse.type
  })
);

export const createCourseFail = createAction(
  '[Courses Management] Create Course Fail',
  (error: any) => ({
    error,
    triggerAction: createCourse.type
  })
);

// unload courses
export const unLoadCourses = createAction('[Learning] UnLoad Courses');
