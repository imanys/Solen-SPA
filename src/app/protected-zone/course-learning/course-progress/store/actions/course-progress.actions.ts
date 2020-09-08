import {createAction} from '@ngrx/store';

import {
  LearnerCourseContentDto,
  AddLearnerAccessHistoryCommand,
} from 'src/app/models';

export const loadLectures = createAction(
  '[Learning] Load Lectures',
  (courseContent: LearnerCourseContentDto) => ({courseContent})
);

export const loadLearnerLastLecture = createAction(
  '[Learning] Load Learner Course Progress',
  (lastLecture: string) => ({
    lastLecture
  })
);


// load completed content
export const loadCompletedLectures = createAction(
  '[Learning] Load Learner Completed Lectures',
  (courseId: string) => ({
    courseId,
  })
);

export const loadCompletedLecturesSuccess = createAction(
  '[Learning] Load Learner Completed Lectures Success',
  (completedLectures: string[]) => ({
    completedLectures
  })
);

export const loadCompletedLecturesFail = createAction(
  '[Learning] Load Learner Completed Lectures Fail',
  (error: any) => ({
    error,
  })
);

// course content loaded
export const courseContentLoaded = createAction(
  '[Learning] Course Content Loaded'
);

// NEXT LECTURE
export const nextLecture = createAction(
  '[Learning] Next Lecture',
  (nextLectureId: string) => ({
    nextLectureId
  })
);

// UPDATE LAST LECTURE
export const updateLastLecture = createAction(
  '[Learning] Update Learner Access History',
  (command: AddLearnerAccessHistoryCommand) => ({
    command
  })
);

// COMPLETE LECTURE
export const completeLecture = createAction('[Learning] Complete Lecture', (lectureId: string) => ({lectureId}));
export const completeLectureSuccess = createAction('[Learning] Complete Lecture Success');
export const completeLectureFail = createAction('[Learning] Complete Lecture Fail', (error: any) => ({error}));

// UNCOMPLETE LECTURE
export const uncompleteLecture = createAction('[Learning] Uncomplete Lecture', (lectureId: string) => ({lectureId}));
export const uncompleteLectureSuccess = createAction('[Learning] Uncomplete Lecture Success');
export const uncompleteLectureFail = createAction('[Learning] Uncomplete Lecture Fail', (error: any) => ({error}));


// GO TO THE NEXT LECTURE
export const goToTheNextLecture = createAction('[Learning] Go To The Next Lecture');

// GO TO THE PREVIOUS LECTURE
export const goToThePreviousLecture = createAction('[Learning] Go To The Previous Lecture');
