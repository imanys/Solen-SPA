import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {StorageInfoDto, UserCountInfoDto} from 'src/app/models';


@Component({
  selector: 'app-storage-user-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['storage-user-info.component.scss'],
  template: `

    <mat-card>
      <div class="header">
        <a [routerLink]="['/workspace/settings/organization']">
          <h2 class="title">Storage</h2>
        </a>
      </div>
      <div class="data-info">
        <span>Maximum storage </span> : {{formatBytes(storageInfo?.maximumStorage)}}
      </div>
      <div class="data-info">
        <span>Current storage </span> : {{ formatBytes(storageInfo?.currentStorage)}} ({{ storageRatio | percent}})
      </div>
      <mat-divider></mat-divider>
      <div class="header">
        <a [routerLink]="['/workspace/users']">
          <h2 class="title">Users</h2>
        </a>
      </div>
      <div class="data-info">
        <span>Maximum users </span> : {{userCountInfo.maximumUsers}}
      </div>
      <div class="data-info">
        <span>Current user count </span> : {{ userCountInfo.currentUserCount}}
      </div>
    </mat-card>

  `
})
export class StorageUserInfoComponent {
  @Input() storageInfo: StorageInfoDto;
  @Input() userCountInfo: UserCountInfoDto;

  get storageRatio() {
    return this.storageInfo?.currentStorage / this.storageInfo?.maximumStorage;
  }

  formatBytes(bytes, decimals = 0) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

