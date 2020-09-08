import { createReducer, on, Action } from '@ngrx/store';

import * as fromCourseProgress from '../actions/course-progress.actions';
import { LearnerLectureDto } from 'src/app/models';

export interface State {
  lectures: { [id: string]: LearnerLectureDto };
  completedLectures: string[];
  lastLecture: string;
}

export const initialState: State = {
  lectures: {},
  completedLectures: [],
  lastLecture: null
};

const featureReducer = createReducer(
  initialState,
  on(fromCourseProgress.loadLectures, (state, { courseContent }) => {
    const allLectures = courseContent.modules
      .map(m => m.lectures)
      .reduce((a, b) => a.concat(b), []);

    const lectures = allLectures.reduce(
      (
        lectureEntities: { [id: string]: LearnerLectureDto },
        lecture: LearnerLectureDto
      ) => {
        return {
          ...lectureEntities,
          [lecture.id]: lecture
        };
      },
      {}
    );

    return { ...state, lectures };
  }),
  on(
    fromCourseProgress.loadCompletedLecturesSuccess,
    (state, { completedLectures }) => ({ ...state, completedLectures })
  ),
  on(
    fromCourseProgress.loadLearnerLastLecture,
    (state, { lastLecture }) => ({ ...state, lastLecture })
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLecturesEntities = (state: State) => state.lectures;
export const getLearnerCompletedLectures = (state: State) => state.completedLectures;
export const getLearnerLastLecture = (state: State) => state.lastLecture;
