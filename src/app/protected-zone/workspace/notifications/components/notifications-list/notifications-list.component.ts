import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {NotificationDto} from 'src/app/models';


@Component({
  selector: 'app-notifications-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['notifications-list.component.scss'],
  template: `
    <mat-card>
      <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          <table mat-table [dataSource]="dataSource" matSort [hidden]="dataSource.data.length == 0">

            <ng-container matColumnDef="creationDate">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
              <td mat-cell *matCellDef="let row"> {{row.creationDate | date}} </td>
            </ng-container>

            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Subject</th>
              <td mat-cell *matCellDef="let row"> {{row.subject}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectNotification(row)" [class.unread]="!row.isRead">

            </tr>
          </table>
        </div>

        <div [hidden]="dataSource.data.length > 0">No records found</div>
        <div [hidden]="dataSource.data.length == 0">
          <mat-paginator [pageSize]="10" [pageSizeOptions]="[10, 20, 50]">
          </mat-paginator>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class NotificationsListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<NotificationDto>();
  displayedColumns = ['creationDate', 'subject'];

  @Input() notifications: NotificationDto[];
  @Output() notificationSelected = new EventEmitter<NotificationDto>();


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.notifications;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = this.notifications;
  }

  selectNotification(notification: NotificationDto) {
    this.notificationSelected.emit(notification);
  }
}

