import {courseGeneralComponents} from './course-general';
import {CourseInfoHeaderComponent} from './course-info-header/course-info-header.component';
import {CourseErrorsComponent} from './course-errors/course-errors.component';

export const components: any[] = [
  ...courseGeneralComponents,
  CourseInfoHeaderComponent,
  CourseErrorsComponent
];

export * from './course-general';
export * from './course-info-header/course-info-header.component';
export * from './course-errors/course-errors.component';
