import {createAction} from '@ngrx/store';

import {LearnerCourseContentDto} from 'src/app/models';

// load course content
export const loadCourseContent = createAction(
  '[Learning] Load Course Content',
  (courseId: string) => ({
    courseId,
     // showLoader: true
  })
);

export const loadCourseContentSuccess = createAction(
  '[Learning] Load Course Content Success',
  (content: LearnerCourseContentDto) => ({
    content,
    triggerAction: loadCourseContent.type
  })
);

export const loadCourseContentFail = createAction(
  '[Learning] Load Course Content Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourseContent.type
  })
);
