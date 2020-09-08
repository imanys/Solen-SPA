import {CourseContentEffects} from './course-content.effects';
import {CoursesEffects} from './courses.effects';
import {ModulesEffects} from './modules.effects';
import {LecturesEffects} from './lectures.effects';
import {CourseLearningPathsEffects} from './course-learning-paths.effects';
import {CoursesFiltersEffects} from './courses-filters.effects';

export const effects: any = [
  CourseContentEffects,
  CoursesEffects,
  ModulesEffects,
  LecturesEffects,
  CourseLearningPathsEffects,
  CoursesFiltersEffects
];

export * from './course-content.effects';
export * from './courses.effects';
export * from './modules.effects';
export * from './lectures.effects';
export * from './course-learning-paths.effects';
export * from './courses-filters.effects';
