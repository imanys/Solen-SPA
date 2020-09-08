import { createAction } from '@ngrx/store';

export const showSpinner = createAction(
  '[UI] Show loading spinner',
  (action: any) => ({ action })
);

export const hideSpinner = createAction(
  '[UI] Hide loading spinner',
  (action: any) => ({ action })
);
