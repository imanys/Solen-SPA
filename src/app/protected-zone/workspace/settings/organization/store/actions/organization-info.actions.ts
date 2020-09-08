import {createAction} from '@ngrx/store';

import {OrganizationInfoViewModel, UpdateOrganizationInfoCommand} from 'src/app/models';


export const loadOrganizationInfo = createAction('[Settings] Load Organization Info', () => ({
  showLoader: true
}));

export const loadOrganizationInfoSuccess = createAction(
  '[Settings] Load Organization Info Success',
  (viewModel: OrganizationInfoViewModel) => ({
    viewModel,
    triggerAction: loadOrganizationInfo.type
  })
);

export const loadOrganizationInfoFail = createAction(
  '[Settings] Load Organization Info Fail',
  (error: any) => ({
    error,
    triggerAction: loadOrganizationInfo.type
  })
);

export const unloadOrganizationInfo = createAction('[Settings] Unload Organization Info');

// UPDATE ORGANIZATION INFO
export const updateOrganizationInfo = createAction(
  '[Settings] Update Organization Info',
  (command: UpdateOrganizationInfoCommand) => ({command, showLoader: true})
);

export const updateOrganizationInfoSuccess = createAction(
  '[Settings] Update Organization Info Success',
  () => ({triggerAction: updateOrganizationInfo.type})
);

export const updateOrganizationInfoFail = createAction(
  '[Settings] Update Organization Info Fail',
  (error: any) => ({
    error,
    triggerAction: updateOrganizationInfo.type
  })
);
