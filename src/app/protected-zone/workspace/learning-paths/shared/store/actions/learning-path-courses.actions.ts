import {createAction} from '@ngrx/store';

import {
  AddCoursesToLearningPathCommand,
  CourseForLearningPathDto,
  RemoveCourseFromLearningPathCommand,
  UpdateCoursesOrdersCommand
} from 'src/app/models';


export const loadLearningPathCourses = createAction(
  '[Learning Paths] Load Learning Path Courses', () => ({
    showLoader: true
  }));

export const loadLearningPathCoursesSuccess = createAction(
  '[Learning Paths] Load Learning Path Courses Success',
  (courses: CourseForLearningPathDto[]) => ({
    courses,
    triggerAction: loadLearningPathCourses.type
  })
);

export const loadLearningPathCoursesFail = createAction(
  '[Learning Paths] Load Learning Path Courses Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearningPathCourses.type
  })
);

export const unloadLearningPathCourses = createAction('[Learning Paths] Unload Learning Path Courses');


// ADD COURSES TO LEARNING PATH
export const addCoursesToLearningPath = createAction(
  '[Learning Paths] Add courses To Learning Path', (command: AddCoursesToLearningPathCommand) => ({
    command,
    showLoader: true
  }));

export const addCoursesToLearningPathSuccess = createAction(
  '[Learning Paths] Add courses To Learning Path Success',
  () => ({triggerAction: addCoursesToLearningPath.type})
);

export const addCoursesToLearningPathFail = createAction(
  '[Learning Paths] Add courses To Learning Path Fail',
  (error: any) => ({
    error,
    triggerAction: addCoursesToLearningPath.type
  })
);

// REMOVE COURSE FROM LEARNING PATH
export const removeCourseFromLearningPath = createAction(
  '[Learning Paths] Remove Course From Learning Path', (command: RemoveCourseFromLearningPathCommand) => ({
    command,
    showLoader: true
  }));

export const removeCourseFromLearningPathSuccess = createAction(
  '[Learning Paths] Remove Course From Learning Path Success',
  () => ({triggerAction: removeCourseFromLearningPath.type})
);

export const removeCourseFromLearningPathFail = createAction(
  '[Learning Paths] Remove Course From Learning Path Fail',
  (error: any) => ({
    error,
    triggerAction: removeCourseFromLearningPath.type
  })
);

// UPDATE COURSES ORDERS
export const updateCoursesOrders = createAction(
  '[Learning Paths] Update Courses Orders', (courses: CourseForLearningPathDto[]) => ({
    courses,
    showLoader: true
  }));

export const updateCoursesOrdersSuccess = createAction(
  '[Learning Paths] Update Courses Orders Success',
  () => ({triggerAction: updateCoursesOrders.type})
);

export const updateCoursesOrdersFail = createAction(
  '[Learning Paths] Update Courses Orders Fail',
  (error: any) => ({
    error,
    triggerAction: updateCoursesOrders.type
  })
);
