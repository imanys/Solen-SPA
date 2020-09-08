import {LearningPathsEffects} from './learning-paths.effects';
import {LearningPathCoursesEffects} from './learning-path-courses.effects';
import {LearningPathLearnersEffects} from './learning-path-learners.effects';

export const effects: any[] = [
  LearningPathsEffects,
  LearningPathCoursesEffects,
  LearningPathLearnersEffects
];

export * from './learning-paths.effects';
export * from './learning-path-courses.effects';
export * from './learning-path-learners.effects';
