import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  UpdateModulesOrdersCommand,
  UpdateModuleCommand,
  ModuleDto,
  ModuleViewModel,
  CreateModuleCommand,
  CommandResponse
} from 'src/app/models/models';

@Injectable()
export class ModulesService {
  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  reorderModules(command: UpdateModulesOrdersCommand) {
    return this.http
      .put(
        `${this.env.apiUrl}/courses-management/courses/modulesOrders`,
        command
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  getModule(moduleId: string): Observable<ModuleDto> {
    return this.http
      .get<ModuleViewModel>(`${this.env.apiUrl}/courses-management/modules/${moduleId}`)
      .pipe(
        map((view: ModuleViewModel) => view.module),
        catchError((error: any) => throwError(error))
      );
  }

  createModule(command: CreateModuleCommand) {
    return this.http
      .post<CommandResponse>(`${this.env.apiUrl}/courses-management/modules`, command)
      .pipe(
        map(response => response.value),
        catchError((error: any) => throwError(error))
      );
  }

  updateModule(command: UpdateModuleCommand) {
    return this.http
      .put(`${this.env.apiUrl}/courses-management/modules`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteModule(moduleId: string) {
    return this.http
      .delete(`${this.env.apiUrl}/courses-management/modules/${moduleId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
