import {StorageInfoService} from './storage-info.service';
import {UsersInfoService} from './users-info.service';
import {LearnerInfoService} from './learner-info.service';
import {CoursesInfoService} from './courses-info.service';
import {LearningPathsService} from './learning-paths.service';

export const services: any[] = [
  StorageInfoService,
  UsersInfoService,
  LearnerInfoService,
  CoursesInfoService,
  LearningPathsService
];

export * from './storage-info.service';
export * from './users-info.service';
export * from './learner-info.service';
export * from './courses-info.service';
export * from './learning-paths.service';
