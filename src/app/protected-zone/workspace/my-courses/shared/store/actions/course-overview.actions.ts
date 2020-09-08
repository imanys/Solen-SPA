// load course overview
import {createAction} from '@ngrx/store';
import {LearnerCourseOverviewDto} from 'src/app/models';

export const loadCourseOverview = createAction(
  '[My courses] Load Course Overview',
  (courseId: string) => ({
    courseId,
    showLoader: true
  })
);

export const loadCourseOverviewSuccess = createAction(
  '[My courses] Load Course Overview Success',
  (courseOverview: LearnerCourseOverviewDto) => ({
    courseOverview,
    triggerAction: loadCourseOverview.type
  })
);

export const loadCourseOverviewFail = createAction(
  '[My courses] Load Course Overview Fail',
  (error: any) => ({
    error,
    triggerAction: loadCourseOverview.type
  })
);
