import {CoursesGuard} from './courses.guard';
import {CourseOverviewGuard} from './course-overview.guard';

export const guards: any[] = [CoursesGuard, CourseOverviewGuard];

export * from './courses.guard';
export * from './course-overview.guard';
