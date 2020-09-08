import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourse from '../reducers/course.reducer';
import {LearnerLectureDto} from 'src/app/models';

const getCourseState = createSelector(
  fromFeature.getLearningState,
  (state: fromFeature.LearningState) => state.course
);

export const getCourseContent = createSelector(
  getCourseState,
  fromCourse.getCourseContent
);

export const getCourseId = createSelector(
  getCourseContent,
  content => content && content.courseId
);

export const getCourseTitle = createSelector(
  getCourseContent,
  content => content && content.title
);

export const getCourseDuration = createSelector(
  getCourseContent,
  content => content && content.duration
);

export const getModules = createSelector(
  getCourseContent,
  course => course && course.modules
);

export const getCourseLoading = createSelector(
  getCourseState,
  fromCourse.getCourseContentLoading
);

export const getCourseError = createSelector(
  getCourseState,
  fromCourse.getCourseContentError
);

export const getAllLectures = createSelector(
  getModules,
  modules => {
    const lectures: LearnerLectureDto[] = [];
    return modules && modules.reduce((a, b) => a.concat(b.lectures), lectures);
  }
);


