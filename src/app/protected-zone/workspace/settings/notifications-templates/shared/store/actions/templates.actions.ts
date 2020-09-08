import {createAction} from '@ngrx/store';

import {NotificationTemplateDto, ToggleNotificationActivationCommand} from 'src/app/models';


export const loadTemplates = createAction('[Settings] Load Notifications Templates', () => ({
  showLoader: true
}));

export const loadTemplatesSuccess = createAction(
  '[Settings] Load Notifications Templates Success',
  (templates: NotificationTemplateDto[]) => ({
    templates,
    triggerAction: loadTemplates.type
  })
);

export const loadTemplatesFail = createAction(
  '[Settings] Load Notifications Templates Fail',
  (error: any) => ({
    error,
    triggerAction: loadTemplates.type
  })
);

// UPDATE TEMPLATE
export const updateTemplate = createAction(
  '[Settings] Update Notification Template',
  (command: ToggleNotificationActivationCommand) => ({command, showLoader: true})
);

export const updateTemplateSuccess = createAction(
  '[Settings] Update Notification Template Success',
  (template: NotificationTemplateDto) => ({
    template,
    triggerAction: updateTemplate.type
  })
);

export const updateTemplateFail = createAction(
  '[Settings] Update Notification Template Fail',
  (error: any) => ({
    error,
    triggerAction: updateTemplate.type
  })
);
