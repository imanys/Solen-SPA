import { courseContentComponents } from './course-content';
import { currentLectureComponents } from './current-lecture';

export const components: any[] = [
  ...courseContentComponents,
  ...currentLectureComponents
];

export * from './course-content';
export * from './current-lecture';
