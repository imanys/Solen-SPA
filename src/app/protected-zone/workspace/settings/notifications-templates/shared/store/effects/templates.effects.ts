import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class TemplatesEffects {

  constructor(private actions: Actions, private service: fromServices.TemplatesService) {
  }

  loadTemplates$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadTemplates),
      exhaustMap(() => {
        return this.service.getNotificationsTemplates().pipe(
          map(templates => fromActions.loadTemplatesSuccess(templates)),
          catchError((error: any) => of(fromActions.loadTemplatesFail(error)))
        );
      })
    )
  );

  updateTemplate$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateTemplate),
      switchMap(({command}) => {
        return this.service.toggleNotificationActivation(command).pipe(
          switchMap(() => {
            return this.service
              .getNotificationTemplate(command.templateId)
              .pipe(map(template => fromActions.updateTemplateSuccess(template)));
          }),
          catchError((error: any) => of(fromActions.updateTemplateFail(error)))
        );
      })
    )
  );

  handleUpdateSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateTemplateSuccess
      ),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );


  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadTemplatesFail,
        fromActions.updateTemplateFail,
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
