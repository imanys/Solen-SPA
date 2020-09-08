import {createReducer, on, Action} from '@ngrx/store';

import * as fromCourses from '../actions/courses.actions';

import {LearnerCourseDto, LearnerCourseProgressDto} from 'src/app/models/models';

export interface State {
  courses: LearnerCourseDto[];
  progress: LearnerCourseProgressDto[];
  total: number;
  loaded: boolean;
  error: any;
}

export const initialState: State = {
  courses: [],
  progress: [],
  total: 0,
  loaded: false,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourses.loadCourses, state => ({
    ...state,
    error: null
  })),
  on(fromCourses.loadCoursesSuccess, (state, {queryResult}) => {
    const courses = queryResult.items;
    const total = queryResult.totalItems;
    const progress = queryResult.progress;

    return {
      ...state,
      courses,
      total,
      progress,
      loaded: true
    };
  }),
  on(fromCourses.loadCoursesFail, (state, {error}) => ({
    ...state,
    loaded: false,
    error
  })),
  on(fromCourses.unLoadCourses, (state) => ({
    ...state,
    loaded: false
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCourses = (state: State) => state.courses;
export const getProgress = (state: State) => state.progress;
export const getTotalCourses = (state: State) => state.total;
export const getCoursesLoaded = (state: State) => state.loaded;
export const getCoursesError = (state: State) => state.error;
