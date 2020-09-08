import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCourseContent from '../reducers/course-content.reducer';

import {getAllModules} from './modules.selectors';
import {getLecturesEntities} from './lectures.selectors';

import {ModuleDto, ModuleDetailDto, LectureDto} from 'src/app/models';

const getCourseContentState = createSelector(
  fromFeature.getCourseManagementState,
  (state: fromFeature.CourseManagementState) => state.courseContent
);

export const getCourse = createSelector(
  getCourseContentState,
  fromCourseContent.getCourse
);


function sortByLecturesOrder(l1: LectureDto, l2: LectureDto) {
  return l1.order - l2.order;
}

export const getCourseContent = createSelector(
  getAllModules,
  getLecturesEntities,
  (modules, lecturesEntities) => {
    const moduleDetails = modules.map(
      (module: ModuleDto): ModuleDetailDto => {
        return {
          moduleInfo: module,
          lectures: Object.keys(lecturesEntities)
            .map(id => lecturesEntities[id])
            .filter(l => l.moduleId === module.id)
            .sort(sortByLecturesOrder)
        };
      }
    );

    return moduleDetails;
  }
);

export const getCourseErrors = createSelector(
  getCourseContentState,
  fromCourseContent.getCourseErrors
);
