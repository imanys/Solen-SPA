import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/learning-path-courses.actions';

import {CourseForLearningPathDto} from 'src/app/models';

export interface State {
  courses: CourseForLearningPathDto[];
  loaded: boolean;
}

export const initialState: State = {
  courses: [],
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadLearningPathCoursesSuccess, (state, {courses}) => {
    return {
      ...state,
      courses,
      loaded: true
    };
  }),
  on(
    fromActions.unloadLearningPathCourses, fromActions.loadLearningPathCoursesFail, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLearningPathCourses = (state: State) => state.courses;
export const getLearningPathCoursesLoaded = (state: State) => state.loaded;
