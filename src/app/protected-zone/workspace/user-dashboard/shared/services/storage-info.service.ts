import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {StorageInfoDto, StorageInfoViewModel} from 'src/app/models';

@Injectable()
export class StorageInfoService {
  readonly endPoint = `${this.env.apiUrl}/dashboard/storage`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getStorageInfo(): Observable<StorageInfoDto> {
    return this.http
      .get<StorageInfoViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.storageInfo),
        catchError((error: any) => throwError(error))
      );
  }
}
