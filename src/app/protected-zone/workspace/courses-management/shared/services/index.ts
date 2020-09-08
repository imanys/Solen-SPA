import {CourseContentService} from './course-content.service';
import {CoursesService} from './courses.service';
import {ModulesService} from './modules.service';
import {LecturesService} from './lectures.service';
import {CourseLearningPathsService} from './course-learning-paths.service';
import {CoursesFiltersService} from './courses-filters.service';

export const services: any = [
  CourseContentService,
  CoursesService,
  ModulesService,
  LecturesService,
  CourseLearningPathsService,
  CoursesFiltersService
];

export * from './course-content.service';
export * from './courses.service';
export * from './modules.service';
export * from './lectures.service';
export * from './course-learning-paths.service';
export * from './courses-filters.service';
