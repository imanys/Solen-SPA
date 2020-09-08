import {courseGeneralComponents} from './course-general';
import {courseInfoComponents} from './course-info';
import {CourseErrorsComponent} from './course-errors/course-errors.component';

export const components: any[] = [
  CourseErrorsComponent,
  ...courseGeneralComponents,
  ...courseInfoComponents
];

export * from './course-general';
export * from './course-errors/course-errors.component';
