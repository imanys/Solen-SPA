import { CourseContentGuard } from './course-content.guard';
import { CourseContentEditGuard } from './course-content-edit.guard';
import { CoursesGuard } from './courses.guard';

export const guards: any[] = [
  CourseContentGuard,
  CourseContentEditGuard,
  CoursesGuard
];

export * from './course-content.guard';
export * from './courses.guard';
export * from './course-content-edit.guard';
