import { createReducer, on, Action } from '@ngrx/store';

import * as fromCourseOverview from '../actions/course-overview.actions';
import { LearnerCourseOverviewDto } from 'src/app/models';

export interface State {
  courseOverview: LearnerCourseOverviewDto;
  error: any;
}

export const initialState: State = {
  courseOverview: null,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourseOverview.loadCourseOverview, state => ({
    ...state,
    error: null
  })),
  on(fromCourseOverview.loadCourseOverviewSuccess, (state, { courseOverview }) => ({
    ...state,
    courseOverview,
  })),
  on(fromCourseOverview.loadCourseOverviewFail, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getCourseOverview = (state: State) => state.courseOverview;
export const getCourseOverviewError = (state: State) => state.error;
