import {createAction} from '@ngrx/store';

import {
  CourseContentDto,
  CourseViewModel,
  DraftCourseCommand,
  PublishCourseCommand,
  UnpublishCourseCommand,
  UpdateCourseCommand
} from 'src/app/models/models';

// LOAD COURSE CONTENT
export const loadCourseContent = createAction(
  '[Courses Management] Load Course Content',
  (courseId: string) => ({
    courseId,
    showLoader: true
  })
);

export const loadCourseContentSuccess = createAction(
  '[Courses Management] Load Course Content Success',
  (courseContent: CourseContentDto) => ({
    courseContent,
    triggerAction: loadCourseContent.type
  })
);

export const loadCourseContentFail = createAction(
  '[Courses Management] Load Course Content Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourseContent.type
  })
);

// LOAD ONE COURSE
export const loadCourse = createAction(
  '[Courses Management] Load Course',
  (courseId: string) => ({courseId, showLoader: true})
);

export const loadCourseSuccess = createAction(
  '[Courses Management] Load Course Success',
  (viewModel: CourseViewModel) => ({
    viewModel,
    triggerAction: loadCourse.type
  })
);

export const loadCourseFail = createAction(
  '[Courses Management] Load Course Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourse.type
  })
);

// UPDATE COURSE
export const updateCourse = createAction(
  '[Courses Management] Update Course',
  (command: UpdateCourseCommand) => ({command, showLoader: true})
);

export const updateCourseSuccess = createAction(
  '[Courses Management] Update Course Success',
  (viewModel: CourseViewModel) => ({
    viewModel,
    triggerAction: updateCourse.type
  })
);

export const updateCourseFail = createAction(
  '[Courses Management] Update Course Fail',
  (error: any) => ({
    error,
    triggerAction: updateCourse.type
  })
);

// PUBLISH COURSE
export const publishCourse = createAction(
  '[Courses Management] Publish Course',
  (command: PublishCourseCommand) => ({command, showLoader: true})
);

export const publishCourseSuccess = createAction(
  '[Courses Management] Publish Course Success',
  (viewModel: CourseViewModel) => ({
    viewModel,
    triggerAction: publishCourse.type
  })
);

export const publishCourseFail = createAction(
  '[Courses Management] Publish Course Fail',
  (error: any) => ({
    error,
    triggerAction: publishCourse.type
  })
);

// UNPUBLISH COURSE
export const unpublishCourse = createAction(
  '[Courses Management] Unpublish Course',
  (command: UnpublishCourseCommand) => ({command, showLoader: true})
);

export const unpublishCourseSuccess = createAction(
  '[Courses Management] Unpublish Course Success',
  (viewModel: CourseViewModel) => ({
    viewModel,
    triggerAction: unpublishCourse.type
  })
);

export const unpublishCourseFail = createAction(
  '[Courses Management] unpublish Course Fail',
  (error: any) => ({
    error,
    triggerAction: unpublishCourse.type
  })
);

// DRAFT COURSE
export const draftCourse = createAction(
  '[Courses Management] Draft Course',
  (command: DraftCourseCommand) => ({command, showLoader: true})
);

export const draftCourseSuccess = createAction(
  '[Courses Management] Draft Course Success',
  (viewModel: CourseViewModel) => ({
    viewModel,
    triggerAction: draftCourse.type
  })
);

export const draftCourseFail = createAction(
  '[Courses Management] Draft Course Fail',
  (error: any) => ({
    error,
    triggerAction: draftCourse.type
  })
);

