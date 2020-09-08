import {StorageInfoEffects} from './storage-info.effects';
import {UsersInfoEffects} from './users-info.effects';
import {LearnerInfoEffects} from './learner-info.effects';
import {CoursesInfoEffects} from './courses-info.effects';
import {LearningPathsEffects} from './learning-paths.effects';

export const effects: any[] = [
  StorageInfoEffects,
  UsersInfoEffects,
  LearnerInfoEffects,
  CoursesInfoEffects,
  LearningPathsEffects
];

export * from './storage-info.effects';
export * from './users-info.effects';
export * from './learner-info.effects';
export * from './courses-info.effects';
export * from './learning-paths.effects';
