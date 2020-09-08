import { buttons } from './buttons';
import { ui, ConfirmationDialogComponent } from './ui';
import { icons } from './icons';
import { templates } from './templates';
import { tools } from './tools';

export const entryComponents: any[] = [ConfirmationDialogComponent];
export const components: any[] = [
  ...icons,
  ...buttons,
  ...ui,
  ...templates,
  ...tools
];

export * from './icons';
export * from './ui';
export * from './buttons';
export * from './templates';
export * from './tools';
