import {LearningPathCoursesComponent} from './learning-path-courses/learning-path-courses.component';
import {LearningPathCoursesFiltersComponent} from './learning-path-courses-filters/learning-path-courses-filters.component';
import {CoursesToAddFiltersComponent} from './courses-to-add-filters/courses-to-add-filters.component';
import {CoursesToAddComponent} from './courses-to-add/courses-to-add.component';


export const components: any[] = [
  LearningPathCoursesComponent,
  LearningPathCoursesFiltersComponent,
  CoursesToAddFiltersComponent,
  CoursesToAddComponent
];

export const entryComponents: any[] = [CoursesToAddComponent];

export * from './learning-path-courses/learning-path-courses.component';
export * from './learning-path-courses-filters/learning-path-courses-filters.component';
export * from './courses-to-add-filters/courses-to-add-filters.component';
export * from './courses-to-add/courses-to-add.component';
