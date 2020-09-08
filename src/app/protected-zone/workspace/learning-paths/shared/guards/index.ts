import {LearningPathsGuard} from './learning-paths.guard';
import {LearningPathExistGuard} from './learning-path-exist.guard';
import {LearningPathCoursesGuard} from './learning-path-courses.guard';
import {LearningPathLearnersGuard} from './learning-path-learners.guard';

export const guards: any[] = [
  LearningPathsGuard,
  LearningPathExistGuard,
  LearningPathCoursesGuard,
  LearningPathLearnersGuard
];

export * from './learning-paths.guard';
export * from './learning-path-exist.guard';
export * from './learning-path-courses.guard';
export * from './learning-path-learners.guard';
