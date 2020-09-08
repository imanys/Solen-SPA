import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLearningPathCourses from '../reducers/learning-path-courses.reducer';


const getLearningPathCoursesState = createSelector(
  fromFeature.getLearningPathsState,
  (state: fromFeature.LearningPathsState) => state.courses
);

export const getLearningPathCourses = createSelector(
  getLearningPathCoursesState,
  fromLearningPathCourses.getLearningPathCourses
);

export const getLearningPathCoursesLoaded = createSelector(
  getLearningPathCoursesState,
  fromLearningPathCourses.getLearningPathCoursesLoaded
);
