import { createAction } from '@ngrx/store';

import {
  CourseContentDto,
  ModuleDto,
  UpdateModuleCommand,
  CreateModuleCommand,
  ModuleOrderDto
} from 'src/app/models/models';

export const loadCourseModules = createAction(
  '[Courses Management] Load Course Modules',
  (courseContent: CourseContentDto) => ({ courseContent })
);

// CURRENT MODULE
export const setCurrentModuleId = createAction(
  '[Courses Management] Set Current Module Id',
  (currentModuleId: string) => ({
    currentModuleId
  })
);

// CREATE ONE MODULE
export const createModule = createAction(
  '[Courses Management] Create Module',
  (command: CreateModuleCommand) => ({ command, showLoader: true })
);

export const createModuleSuccess = createAction(
  '[Courses Management] Create Module Success',
  (module: ModuleDto) => ({
    module,
    triggerAction: createModule.type
  })
);

export const createModuleFail = createAction(
  '[Courses Management] Create Module Fail',
  (error: any) => ({
    error,
    triggerAction: createModule.type
  })
);

// UPDATE MODULE
export const updateModule = createAction(
  '[Courses Management] Update Module',
  (command: UpdateModuleCommand) => ({ command, showLoader: true })
);

export const updateModuleSuccess = createAction(
  '[Courses Management] Update Module Success',
  (module: ModuleDto) => ({
    module,
    triggerAction: updateModule.type
  })
);

export const updateModuleFail = createAction(
  '[Courses Management] Update Module Fail',
  (error: any) => ({
    error,
    triggerAction: updateModule.type
  })
);

// LOAD MODULE
export const loadModule = createAction(
  '[Courses Management] Load Module',
  (moduleId: string) => ({ moduleId })
);

export const loadModuleSuccess = createAction(
  '[Courses Management] Load Module Success',
  (module: ModuleDto) => ({ module })
);

export const loadModuleFail = createAction(
  '[Courses Management] Load Module Fail',
  (error: any) => ({ error })
);

// DELETE MODULE
export const deleteModule = createAction(
  '[Courses Management] Delete Module',
  (moduleId: string) => ({ moduleId, showLoader: true })
);

export const deleteModuleSuccess = createAction(
  '[Courses Management] Delete Module Success',
  (moduleId: string) => ({
    moduleId,
    triggerAction: deleteModule.type
  })
);

export const deleteModuleFail = createAction(
  '[Courses Management] Delete Module Fail',
  (error: any) => ({
    error,
    triggerAction: deleteModule.type
  })
);

// REORDER MODULES
export const reorderCourseModules = createAction(
  '[Courses Management] Reorder Course Modules',
  (modules: ModuleDto[]) => ({ modules, showLoader: true })
);

export const reorderCourseModulesSuccess = createAction(
  '[Courses Management] Reorder Course Modules Success',
  (modulesOrders: ModuleOrderDto[]) => ({
    modulesOrders,
    triggerAction: reorderCourseModules.type
  })
);

export const reorderCourseModulesFail = createAction(
  '[Courses Management] Reorder Course Modules Fail',
  (error: any) => ({
    error,
    triggerAction: reorderCourseModules.type
  })
);
