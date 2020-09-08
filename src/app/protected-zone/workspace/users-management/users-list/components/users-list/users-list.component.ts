import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {UsersListItemDto} from 'src/app/models/models';


@Component({
  selector: 'app-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['users-list.component.scss'],
  template: `
    <app-users-list-filters [users]="users"
                            (filterChanged)="onFilterChange($event)"
                            (filterReset)="onFilterReset()">
    </app-users-list-filters>
    <mat-card>
      <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          <table mat-table [dataSource]="dataSource" matSort [hidden]="dataSource.data.length == 0">

            <ng-container matColumnDef="userName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Username</th>
              <td mat-cell *matCellDef="let row"> {{row.userName}} </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
              <td mat-cell *matCellDef="let row"> {{row.email}} </td>
            </ng-container>

            <ng-container matColumnDef="learningPath">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Learning Path</th>
              <td mat-cell *matCellDef="let row">{{row.learningPath}}</td>
            </ng-container>

            <ng-container matColumnDef="roles">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Role(s)</th>
              <td mat-cell *matCellDef="let row">{{row.roles}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let row">{{row.status}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectUser(row)">

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
export class UsersListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<UsersListItemDto>();
  displayedColumns = ['userName', 'email', 'learningPath', 'roles', 'status'];

  @Input() users: UsersListItemDto[];
  @Output() userSelected = new EventEmitter<string>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.data = this.users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnChanges() {
    this.dataSource.data = this.users;
  }

  onFilterChange(filter: string) {
    this.dataSource.filter = filter;
  }

  onFilterReset() {
    this.dataSource.filter = '';
  }

  selectUser(user: UsersListItemDto) {
    this.userSelected.emit(user.id);
  }

  createFilter() {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      const nameSearch = () => {
        if (isFilterSet) {
          let found = true;
          for (const col in searchTerms) {
            if (searchTerms.hasOwnProperty(col)) {
              searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
                if (!data[col] || data[col].toString().toLowerCase().indexOf(word) === -1) {
                  found = false;
                }
              });
            }
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }


}

