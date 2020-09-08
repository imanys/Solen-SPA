import {CourseEffects} from './course.effects';
import {CourseProgressEffects} from './course-progress.effects';


export const effects: any[] = [
  CourseEffects,
  CourseProgressEffects,
];
export * from './course.effects';
export * from './course-progress.effects';

