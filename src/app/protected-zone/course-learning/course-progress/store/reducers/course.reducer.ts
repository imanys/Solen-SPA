import { createReducer, on, Action } from '@ngrx/store';

import * as fromCourse from '../actions/course.actions';
import { LearnerCourseContentDto } from 'src/app/models';

export interface State {
  content: LearnerCourseContentDto;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  content: null,
  loading: false,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourse.loadCourseContent, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromCourse.loadCourseContentSuccess, (state, { content }) => ({
    ...state,
    content,
    loading: false
  })),
  on(fromCourse.loadCourseContentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCourseContent = (state: State) => state.content;
export const getCourseContentLoading = (state: State) => state.loading;
export const getCourseContentError = (state: State) => state.error;
