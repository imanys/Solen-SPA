import { createAction } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
  '[Router] Go',
  (route: { path: any[]; query?: object; extras?: NavigationExtras }) => ({
    route
  })
);

export const back = createAction('[Router] Back');

export const forward = createAction('[Router] Back');
