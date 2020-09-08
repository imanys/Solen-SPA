import {createReducer, on, Action} from '@ngrx/store';

import * as fromActions from '../actions/templates.actions';

import {NotificationTemplateDto} from 'src/app/models';

export interface State {
  entities: { [id: string]: NotificationTemplateDto };
  loaded: boolean;
}

export const initialState: State = {
  entities: {},
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadTemplatesSuccess, (state, {templates}) => {
    const entities = templates.reduce(
      (templateEntities: { [id: string]: NotificationTemplateDto }, template: NotificationTemplateDto) => {
        return {
          ...templateEntities,
          [template.id]: template
        };
      },
      {}
    );

    return {
      ...state,
      entities,
      loaded: true
    };
  }),
  on(
    fromActions.updateTemplateSuccess,
    (state, {template}) => {
      const entities = {
        ...state.entities,
        [template.id]: template
      };

      return {...state, entities};
    }
  ),
  on(
    fromActions.loadTemplatesFail, state => ({...state, loaded: false})
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getTemplatesEntities = (state: State) => state.entities;
export const getTemplatesLoaded = (state: State) => state.loaded;
