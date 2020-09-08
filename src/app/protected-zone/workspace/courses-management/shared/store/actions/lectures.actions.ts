import { createAction } from '@ngrx/store';
import {
  CourseContentDto,
  CreateLectureCommand,
  LectureDto,
  UpdateLectureCommand,
  LectureOrderDto
} from 'src/app/models/models';

export const loadCourseLectures = createAction(
  '[Courses Management] Load Course Lectures',
  (courseContent: CourseContentDto) => ({ courseContent })
);

// CURRENT LECTURE
export const setCurrentLectureId = createAction(
  '[Courses Management] Set Current Lecture Id',
  (currentLectureId: string) => ({
    currentLectureId
  })
);

// CREATE ONE LECTURE
export const createLecture = createAction(
  '[Courses Management] Create Lecture',
  (command: CreateLectureCommand) => ({ command, showLoader: true })
);

export const createLectureSuccess = createAction(
  '[Courses Management] Create Lecture Success',
  (lecture: LectureDto) => ({
    lecture,
    triggerAction: createLecture.type
  })
);

export const createLectureFail = createAction(
  '[Courses Management] Create Lecture Fail',
  (error: any) => ({
    error,
    triggerAction: createLecture.type
  })
);

// UPDATE LECTURE
export const updateLecture = createAction(
  '[Courses Management] Update Lecture',
  (command: UpdateLectureCommand) => ({ command, showLoader: true })
);

export const updateLectureSuccess = createAction(
  '[Courses Management] Update Lecture Success',
  (lecture: LectureDto) => ({
    lecture,
    triggerAction: updateLecture.type
  })
);

export const updateLectureFail = createAction(
  '[Courses Management] Update Lecture Fail',
  (error: any) => ({
    error,
    triggerAction: updateLecture.type
  })
);

// DELETE LECTURE
export const deleteLecture = createAction(
  '[Courses Management] Delete Lecture',
  (lecture: LectureDto) => ({ lecture, showLoader: true })
);

export const deleteLectureSuccess = createAction(
  '[Courses Management] Delete Lecture Success',
  (lectureId: string) => ({
    lectureId,
    triggerAction: deleteLecture.type
  })
);

export const deleteLectureFail = createAction(
  '[Courses Management] Delete Lecture Fail',
  (error: any) => ({
    error,
    triggerAction: deleteLecture.type
  })
);

// REORDER LECTURES
export const reorderCourseLectures = createAction(
  '[Courses Management] Reorder Course Lectures',
  (lectures: LectureDto[]) => ({ lectures, showLoader: true })
);

export const reorderCourseLecturesSuccess = createAction(
  '[Courses Management] Reorder Course Lectures Success',
  (lecturesOrders: LectureOrderDto[]) => ({
    lecturesOrders,
    triggerAction: reorderCourseLectures.type
  })
);

export const reorderCourseLecturesFail = createAction(
  '[Courses Management] Reorder Course Lectures Fail',
  (error: any) => ({
    error,
    triggerAction: reorderCourseLectures.type
  })
);
