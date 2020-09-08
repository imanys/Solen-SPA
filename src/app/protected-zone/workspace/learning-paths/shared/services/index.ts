import {LearningPathsService} from './learning-paths.service';
import {LearningPathCoursesService} from './learning-path-courses.service';
import {LearningPathLearnersService} from './learning-path-learners.service';

export const services: any[] = [
  LearningPathsService,
  LearningPathCoursesService,
  LearningPathLearnersService
];

export * from './learning-paths.service';
export * from './learning-path-courses.service';
export * from './learning-path-learners.service';
