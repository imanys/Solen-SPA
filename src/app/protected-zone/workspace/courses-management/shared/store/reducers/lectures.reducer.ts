import { createReducer, on, Action } from '@ngrx/store';

import * as fromLectures from '../actions/lectures.actions';
import { LectureDto, LectureType } from 'src/app/models';

export interface State {
  entities: { [id: string]: LectureDto };
  currentLectureId: string;
  error: any;
  lectureTypes: LectureType[];
}

export const initialState: State = {
  entities: {},
  currentLectureId: null,
  error: null,
  lectureTypes: [
    { id: 'Article', value: 'Article' },
    { id: 'Video', value: 'Video' }
  ]
};

const featureReducer = createReducer(
  initialState,
  on(fromLectures.loadCourseLectures, (state, { courseContent }) => {
    const allLectures = courseContent.modules
      .map(m => m.lectures)
      .reduce((a, b) => a.concat(b), []);

    const entities = allLectures.reduce(
      (lectureEntities: { [id: string]: LectureDto }, lecture: LectureDto) => {
        return {
          ...lectureEntities,
          [lecture.id]: lecture
        };
      },
      {}
    );

    return { ...state, entities, currentLectureId: null };
  }),
  on(fromLectures.setCurrentLectureId, (state, { currentLectureId }) => ({
    ...state,
    currentLectureId
  })),
  on(fromLectures.reorderCourseLecturesSuccess, (state, { lecturesOrders }) => {
    const entities = { ...state.entities };

    lecturesOrders.forEach(l => {
      entities[l.lectureId] = {
        ...entities[l.lectureId],
        order: l.order
      };
    });
    return { ...state, entities };
  }),
  on(
    fromLectures.updateLectureSuccess,
    fromLectures.createLectureSuccess,
    (state, { lecture }) => {
      const entities = {
        ...state.entities,
        [lecture.id]: lecture
      };
      return { ...state, entities };
    }
  ),
  on(fromLectures.deleteLectureSuccess, (state, { lectureId }) => {
    const entities = removeLecture(lectureId, state.entities);

    return { ...state, entities };
  }),
  on(
    fromLectures.deleteLectureFail,
    fromLectures.reorderCourseLecturesFail,
    (state, { error }) => ({ ...state, error })
  )
);

function removeLecture(id: string, lectures: { [id: string]: LectureDto }) {
  const { [id]: removed, ...results } = lectures;
  return results;
}

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getLecturesEntities = (state: State) => state.entities;
export const getCurrentLectureId = (state: State) => state.currentLectureId;
export const getLecturesError = (state: State) => state.error;
export const getLectureTypes = (state: State) => state.lectureTypes;
