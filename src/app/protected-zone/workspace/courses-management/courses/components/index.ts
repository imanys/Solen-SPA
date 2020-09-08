import {CourseCreateDialogComponent} from './course-create-dialog/course-create-dialog.component';
import {CourseListItemComponent} from './course-list-item/course-list-item.component';
import {CoursesFiltersComponent} from './courses-filters/courses-filters.component';

export const components: any[] = [
  CourseCreateDialogComponent,
  CourseListItemComponent,
  CoursesFiltersComponent
];

export const entryComponents: any[] = [CourseCreateDialogComponent];

export * from './course-create-dialog/course-create-dialog.component';
export * from './course-list-item/course-list-item.component';
export * from './courses-filters/courses-filters.component';
