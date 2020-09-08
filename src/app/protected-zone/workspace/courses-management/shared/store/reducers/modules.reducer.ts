import { createReducer, on, Action } from '@ngrx/store';

import * as fromModules from '../actions/modules.actions';

import { ModuleDto, ModuleDetailDto } from 'src/app/models/models';

export interface State {
  entities: { [id: string]: ModuleDto };
  currentModuleId: string;
  error: any;
}

export const initialState: State = {
  entities: {},
  currentModuleId: null,
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromModules.loadCourseModules, (state, { courseContent }) => {
    const entities = courseContent.modules.reduce(
      (
        moduleEntities: { [id: string]: ModuleDto },
        module: ModuleDetailDto
      ) => {
        return {
          ...moduleEntities,
          [module.moduleInfo.id]: module.moduleInfo
        };
      },
      {}
    );
    return {
      ...state,
      entities,
      currentModuleId: null,
      error: null
    };
  }),
  on(fromModules.setCurrentModuleId, (state, { currentModuleId }) => ({
    ...state,
    currentModuleId
  })),
  on(fromModules.reorderCourseModulesSuccess, (state, { modulesOrders }) => {
    const entities = { ...state.entities };
    modulesOrders.forEach(m => {
      entities[m.moduleId] = { ...entities[m.moduleId], order: m.order };
    });
    return {
      ...state,
      entities
    };
  }),
  on(
    fromModules.loadModuleSuccess,
    fromModules.updateModuleSuccess,
    fromModules.createModuleSuccess,
    (state, { module }) => {
      const entities = {
        ...state.entities,
        [module.id]: module
      };
      return {
        ...state,
        entities
      };
    }
  ),
  on(fromModules.deleteModuleSuccess, (state, { moduleId }) => {
    const entities = removeModule(moduleId, state.entities);
    return { ...state, entities };
  }),
  on(
    fromModules.deleteModuleFail,
    fromModules.reorderCourseModulesFail,
    (state, { error }) => ({ ...state, error })
  )
);

function removeModule(id: string, modules: { [id: string]: ModuleDto }) {
  const { [id]: removed, ...results } = modules;
  return results;
}

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getModulesEntities = (state: State) => state.entities;
export const getCurrentModuleId = (state: State) => state.currentModuleId;
export const getModulesError = (state: State) => state.error;
