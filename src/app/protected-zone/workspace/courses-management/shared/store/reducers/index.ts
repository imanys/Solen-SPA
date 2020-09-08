import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCourseContent from './course-content.reducer';
import * as fromCourses from './courses.reducer';
import * as fromModules from './modules.reducer';
import * as fromLectures from './lectures.reducer';
import * as fromCourseLearningPaths from './course-learning-paths.reducer';
import * as fromFilters from './courses-filters.reducer';

export interface CourseManagementState {
  courseContent: fromCourseContent.State;
  courses: fromCourses.State;
  modules: fromModules.State;
  lectures: fromLectures.State;
  courseLearningPaths: fromCourseLearningPaths.State;
  coursesFilters: fromFilters.State;
}

export const reducers: ActionReducerMap<CourseManagementState> = {
  courseContent: fromCourseContent.reducer,
  courses: fromCourses.reducer,
  modules: fromModules.reducer,
  lectures: fromLectures.reducer,
  courseLearningPaths: fromCourseLearningPaths.reducer,
  coursesFilters: fromFilters.reducer
};

export const getCourseManagementState = createFeatureSelector<
  CourseManagementState
>('course-management');
