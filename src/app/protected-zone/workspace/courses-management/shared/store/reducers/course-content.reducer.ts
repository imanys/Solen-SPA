import {createReducer, on, Action} from '@ngrx/store';

import {CourseDto, CourseErrorDto} from 'src/app/models';

import * as fromCourseContent from '../actions/course-content.actions';

export interface State {
  course: CourseDto;
  loaded: boolean;
  loading: boolean;
  courseErrors: CourseErrorDto[];
  error: any;
}

export const initialState: State = {
  course: null,
  loaded: false,
  loading: false,
  courseErrors: [],
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourseContent.loadCourseContent, state => ({
    ...state,
    course: null,
    loading: true,
    error: null,
    loaded: false
  })),
  on(fromCourseContent.loadCourseContentFail, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
  on(
    fromCourseContent.loadCourseSuccess,
    fromCourseContent.updateCourseSuccess,
    fromCourseContent.publishCourseSuccess,
    fromCourseContent.unpublishCourseSuccess,
    fromCourseContent.draftCourseSuccess,
    (state, {viewModel}) => {
      const {course, courseErrors} = viewModel;

      return {...state, loading: false, course, courseErrors};
    }
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCourse = (state: State) => state.course;
export const getCourseErrors = (state: State) => state.courseErrors;
export const getCourseContentLoading = (state: State) => state.loading;
export const getCourseContentLoaded = (state: State) => state.loaded;
export const getCourseContentError = (state: State) => state.error;
