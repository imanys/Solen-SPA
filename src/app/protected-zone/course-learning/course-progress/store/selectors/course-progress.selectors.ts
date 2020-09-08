import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRouter from 'src/app/app-routing/store';
import * as fromCourseProgress from '../reducers/course-progess.reducer';
import {LearnerLectureDto} from 'src/app/models';
import {getAllLectures, getModules} from './course.selectors';


const getCourseProgressState = createSelector(
  fromFeature.getLearningState,
  (state: fromFeature.LearningState) => state.courseProgress
);

export const getLecturesEntities = createSelector(
  getCourseProgressState,
  fromCourseProgress.getLecturesEntities
);

export const getSelectedLecture = createSelector(
  getLecturesEntities,
  fromRouter.getRouterState,
  (entities, router): LearnerLectureDto => {
    return router && router.state && entities[router.state.params.lectureId];
  }
);


export const getCurrentModuleId = createSelector(
  getSelectedLecture,
  selectedLecture => selectedLecture && selectedLecture.moduleId
);

export const getFirstLectureId = createSelector(
  getModules,
  modules =>
    modules &&
    modules.length > 0 &&
    modules[0].lectures.length > 0 &&
    modules[0].lectures[0].id
);

export const getLastLectureId = createSelector(
  getCourseProgressState,
  fromCourseProgress.getLearnerLastLecture
);

export const getCompletedLectures = createSelector(
  getCourseProgressState,
  fromCourseProgress.getLearnerCompletedLectures
);

export const getStartPointLectureId = createSelector(
  getFirstLectureId,
  getLastLectureId,
  (first, last) => (last ? last : first)
);

export const isLastLecture = createSelector(
  getAllLectures,
  getSelectedLecture,
  (lectures, selectedLecture) => {
    return lectures && lectures.length > 0 && selectedLecture && lectures[lectures.length - 1].id === selectedLecture.id;
  }
);

export const isFirstLecture = createSelector(
  getFirstLectureId,
  getSelectedLecture,
  (firstLectureId, selectedLecture) => {
    return firstLectureId && selectedLecture && selectedLecture.id === firstLectureId;
  }
);

export const getCompletedDuration = createSelector(
  getAllLectures,
  getCompletedLectures,
  (lectures, completedLecturesIds) => {
    const completedLectures = lectures.filter(x => completedLecturesIds.includes(x.id));
    return completedLectures.reduce((a, b) => a += b.duration, 0);
  }
);

