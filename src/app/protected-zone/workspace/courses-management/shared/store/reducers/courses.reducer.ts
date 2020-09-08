import {createReducer, on, Action} from '@ngrx/store';

import * as fromCourses from '../actions/courses.actions';

import {CoursesListItemDto} from 'src/app/models/models';

export interface State {
  courses: CoursesListItemDto[];
  total: number;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  courses: [],
  total: 0,
  loaded: false,
  loading: false,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourses.loadCourses, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(fromCourses.loadCoursesSuccess, (state, {queryResult}) => {
    const courses = queryResult.items;
    const total = queryResult.totalItems;

    return {
      ...state,
      courses,
      total,
      loaded: true,
      loading: false
    };
  }),
  on(fromCourses.loadCoursesFail, (state, {error}) => ({
    ...state,
    loaded: false,
    loading: false,
    error
  })),
  on(
    fromCourses.deleteCourseFail,
    fromCourses.createCourseFail,
    (state, {error}) => ({...state, loading: false, error})
  ),
  on(fromCourses.unLoadCourses, (state) => ({
    ...state,
    loaded: false
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCourses = (state: State) => state.courses;
export const getTotal = (state: State) => state.total;
export const getCoursesLoading = (state: State) => state.loading;
export const getCoursesLoaded = (state: State) => state.loaded;
export const getCoursesError = (state: State) => state.error;
