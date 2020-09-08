import { createAction } from '@ngrx/store';

export const openSnackBar = createAction(
  '[UI] Open SnackBar',
  (message: string) => ({
    message
  })
);

export const openSnackBarError = createAction(
  '[UI] Open SnackBar Error',
  (error: string) => ({
    error
  })
);

export const openNotificationSnackBar = createAction(
  '[UI] Open Notification SnackBar',
  (message: string) => ({
    message
  })
);

export const closeSnackBar = createAction('[UI] Close SnackBar');
