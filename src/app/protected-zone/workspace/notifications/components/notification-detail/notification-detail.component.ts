import {Component, ChangeDetectionStrategy, Input} from '@angular/core';


import {NotificationDto} from 'src/app/models/models';

@Component({
  selector: 'app-notification-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['notification-detail.component.scss'],
  template: `
    <mat-card>
      <div fxLayout="column wrap" fxFlexAlign="center center">
        <div fxLayout fxLayoutGap="10px">
          <label>Date : </label>
          <div innerHTML="{{notification?.creationDate | date}} "></div>
        </div>
        <div fxLayout fxLayoutGap="10px">
          <label>Subject : </label>
          <div innerHTML="{{notification?.subject}} "></div>
        </div>
        <div fxLayout="column">
          <label>Message : </label>
          <div innerHTML="{{notification?.body}} "></div>
        </div>
      </div>
    </mat-card>
  `
})
export class NotificationDetailComponent {
  @Input() notification: NotificationDto;

}

