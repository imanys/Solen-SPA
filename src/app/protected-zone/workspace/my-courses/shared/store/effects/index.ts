import {CoursesEffects} from './courses.effects';
import {CoursesFiltersEffects} from './courses-filters.effects';
import {CourseOverviewEffects} from './course-overview.effects';

export const effects: any[] = [
  CoursesEffects,
  CoursesFiltersEffects,
  CourseOverviewEffects
];

export * from './courses.effects';
export * from './courses-filters.effects';
export * from './course-overview.effects';
