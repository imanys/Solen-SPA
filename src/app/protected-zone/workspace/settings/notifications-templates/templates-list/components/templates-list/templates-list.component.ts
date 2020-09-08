import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {NotificationTemplateDto, ToggleNotificationActivationCommand} from 'src/app/models/models';


@Component({
  selector: 'app-templates-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['templates-list.component.scss'],
  template: `
    <app-templates-list-filters [templates]="templates"
                                (filterChanged)="onFilterChange($event)"
                                (filterReset)="onFilterReset()">
    </app-templates-list-filters>
    <mat-card>
      <div fxLayout="row wrap" fxLayoutAlign="center center">
        <table mat-table [dataSource]="dataSource" matSort [hidden]="dataSource.data.length == 0">

          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Type</th>
            <td mat-cell *matCellDef="let row"> {{row.type}} </td>
          </ng-container>

          <ng-container matColumnDef="event">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Event</th>
            <td mat-cell *matCellDef="let row"> {{row.event}} </td>
          </ng-container>

          <ng-container matColumnDef="isActivated">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Active</th>
            <td mat-cell *matCellDef="let row">

              <mat-checkbox [checked]="row.isActivated" (change)="onActiveChange(row, $event)">
              </mat-checkbox>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
      <div [hidden]="dataSource.data.length > 0">No records found</div>
      <div [hidden]="dataSource.data.length == 0">
        <mat-paginator [pageSize]="10" [pageSizeOptions]="[10, 20, 50]">
        </mat-paginator>
      </div>
    </mat-card>
  `
})
export class TemplatesListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<NotificationTemplateDto>();
  displayedColumns = ['type', 'event', 'isActivated'];

  @Input() templates: NotificationTemplateDto[];
  @Output() templateUpdated = new EventEmitter<ToggleNotificationActivationCommand>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.data = this.templates;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnChanges(changes): void {
    this.dataSource.data = this.templates;
  }

  onActiveChange(template: NotificationTemplateDto, event: MatCheckboxChange) {
    this.templateUpdated.emit({templateId: template.id, isActivated: event.checked});
  }

  onFilterChange(filter: string) {
    this.dataSource.filter = filter;
  }

  onFilterReset() {
    this.dataSource.filter = '';
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
                if (data[col].toString().toLowerCase().indexOf(word) === -1) {
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

