import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/courses-info.actions';

import {LastCreatedCourseDto, LastPublishedCourseDto} from 'src/app/models';

export interface State {
  lastCreatedCourse: LastCreatedCourseDto;
  lastPublishedCourse: LastPublishedCourseDto;
  courseCount: number;
  loaded: boolean;
}

export const initialState: State = {
  lastCreatedCourse: null,
  lastPublishedCourse: null,
  courseCount: 0,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadCoursesInfoSuccess, (state, {viewModel}) => {
    const {lastCreatedCourse, lastPublishedCourse, courseCount} = viewModel;

    return {
      ...state,
      lastCreatedCourse,
      lastPublishedCourse,
      courseCount,
      loaded: true
    };
  }),
  on(
    fromActions.loadCoursesInfoFail, fromActions.unloadCoursesInfo, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLastCreatedCourse = (state: State) => state.lastCreatedCourse;
export const getLastPublishedCourse = (state: State) => state.lastPublishedCourse;
export const getCourseCount = (state: State) => state.courseCount;
export const getCoursesInfosLoaded = (state: State) => state.loaded;
