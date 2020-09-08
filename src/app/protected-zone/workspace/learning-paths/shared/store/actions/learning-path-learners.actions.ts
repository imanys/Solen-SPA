import {createAction} from '@ngrx/store';

import {LearnerCompletedCoursesDto, LearnerForLearningPathDto} from 'src/app/models';


export const loadLearningPathLearners = createAction(
  '[Learning Paths] Load Learning Path Learners', () => ({
    showLoader: true
  }));

export const loadLearningPathLearnersSuccess = createAction(
  '[Learning Paths] Load Learning Path Learners Success',
  (learners: LearnerForLearningPathDto[]) => ({
    learners,
    triggerAction: loadLearningPathLearners.type
  })
);

export const loadLearningPathLearnersFail = createAction(
  '[Learning Paths] Load Learning Path Learners Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearningPathLearners.type
  })
);

export const unloadLearningPathLearners = createAction('[Learning Paths] Unload Learning Path Learners');

// LOAD LEARNER PROGRESS
export const loadLearnerProgress = createAction(
  '[Learning Paths] Load Learner Progress', (learnerId: string) => ({
    learnerId,
    showLoader: true
  }));

export const loadLearnerProgressSuccess = createAction(
  '[Learning Paths] Load Learner Progress Success',
  (currentLearnerProgress: LearnerCompletedCoursesDto) => ({
    currentLearnerProgress,
    triggerAction: loadLearnerProgress.type
  })
);

export const loadLearnerProgressFail = createAction(
  '[Learning Paths] Load Learner Progress Fail',
  (error: any) => ({
    error,
    triggerAction: loadLearnerProgress.type
  })
);
