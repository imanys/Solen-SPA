import {createAction} from '@ngrx/store';


export const coursePublishedEvent = createAction('[Notifications] Course Published Event', (message) => ({message}));
