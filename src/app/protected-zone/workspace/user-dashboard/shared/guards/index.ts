import {StorageInfoGuard} from './storage-info.guard';
import {UserCountGuard} from './user-count.guard';
import {LearnerLastCourseProgressGuard} from './learner-last-course-progress.guard';
import {CoursesInfoGuard} from './courses-info.guard';
import {LearningPathsGuard} from './learning-paths.guard';

export const guards: any[] = [
  StorageInfoGuard,
  UserCountGuard,
  LearnerLastCourseProgressGuard,
  CoursesInfoGuard,
  LearningPathsGuard
];

export * from './storage-info.guard';
export * from './user-count.guard';
export * from './learner-last-course-progress.guard';
export * from './courses-info.guard';
export * from './learning-paths.guard';
