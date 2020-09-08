import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {
  map,
  switchMap,
  catchError,
  concatMap,
  withLatestFrom
} from 'rxjs/operators';
import {of} from 'rxjs';

import {Store} from '@ngrx/store';
import {CourseManagementState} from '../reducers';
import {getAllModules, getCourse} from '../selectors';

import * as fromCourseContentActions from '../actions/course-content.actions';
import * as fromActions from '../actions/modules.actions';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromServices from '../../services';

import {ModuleDto, ModuleOrderDto} from 'src/app/models/models';

@Injectable()
export class ModulesEffects {
  constructor(
    private actions: Actions,
    private modulesService: fromServices.ModulesService,
    private store: Store<CourseManagementState>
  ) {
  }

  loadCourseDetailSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromCourseContentActions.loadCourseContentSuccess),
      map(({courseContent}) => fromActions.loadCourseModules(courseContent))
    )
  );

  reorderModules$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.reorderCourseModules),
      withLatestFrom(this.store.select(getCourse)),
      withLatestFrom(this.store.select(getAllModules)),
      switchMap(([[{modules}, course], modulesFromStore]) => {
        const modulesToOrder: ModuleDto[] =
          modules.length === 0 ? modulesFromStore : modules;

        if (modulesToOrder.length === 0) {
          return of(fromActions.reorderCourseModulesSuccess([]));
        }

        const modulesNewOrders: ModuleOrderDto[] = modulesToOrder.map(
          (module, index) => {
            return {moduleId: module.id, order: index + 1};
          }
        );

        return this.modulesService
          .reorderModules({
            courseId: course.id,
            modulesOrders: modulesNewOrders
          })
          .pipe(
            map(() =>
              fromActions.reorderCourseModulesSuccess(modulesNewOrders)
            ),
            catchError((error: any) =>
              of(fromActions.reorderCourseModulesFail(error))
            )
          );
      })
    )
  );

  createModule$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createModule),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{command}, course]) => {
        return this.modulesService.createModule(command).pipe(
          switchMap((moduleId: string) => {
            return this.modulesService
              .getModule(moduleId)
              .pipe(
                concatMap((module: ModuleDto) => [
                  fromActions.createModuleSuccess(module),
                  fromActions.setCurrentModuleId(module.id),
                  fromCourseContentActions.loadCourse(course.id)
                ])
              );
          }),
          catchError((error: any) => of(fromActions.createModuleFail(error)))
        );
      })
    )
  );

  updateModule$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateModule),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{command}, course]) => {
        return this.modulesService.updateModule(command).pipe(
          switchMap(() => {
            return this.modulesService
              .getModule(command.moduleId)
              .pipe(
                concatMap((module: ModuleDto) => [
                    fromActions.updateModuleSuccess(module),
                    fromCourseContentActions.loadCourse(course.id)
                  ]
                )
              );
          }),
          catchError((error: any) => of(fromActions.updateModuleFail(error)))
        );
      })
    )
  );

  handleModulesSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createModuleSuccess, fromActions.updateModuleSuccess),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );

  deleteModule$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteModule),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{moduleId}, course]) => {
        return this.modulesService.deleteModule(moduleId).pipe(
          concatMap(() => [
            fromActions.deleteModuleSuccess(moduleId),
            fromCourseContentActions.loadCourse(course.id)
          ]),
          catchError((error: any) => of(fromActions.deleteModuleFail(error)))
        );
      })
    )
  );

  handleDeleteModuleSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteModuleSuccess),
      concatMap(() => [
        fromUiActions.openSnackBar('Module deleted'),
        fromActions.reorderCourseModules([])
      ])
    )
  );

  loadModule$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadModule),
      switchMap(({moduleId}) => {
        return this.modulesService.getModule(moduleId).pipe(
          map((module: ModuleDto) => fromActions.loadModuleSuccess(module)),
          catchError((error: any) => of(fromActions.loadModuleFail(error)))
        );
      })
    )
  );

  handleModulesFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadModuleFail,
        fromActions.createModuleFail,
        fromActions.deleteModuleFail,
        fromActions.updateModuleFail,
        fromActions.reorderCourseModulesFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
