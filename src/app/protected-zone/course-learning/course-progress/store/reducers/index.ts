import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCourse from './course.reducer';
import * as fromCourseProgress from './course-progess.reducer';


export interface LearningState {
  course: fromCourse.State;
  courseProgress: fromCourseProgress.State;
}

export const reducers: ActionReducerMap<LearningState> = {
  course: fromCourse.reducer,
  courseProgress: fromCourseProgress.reducer,
};

export const getLearningState = createFeatureSelector<LearningState>('course-learning');
