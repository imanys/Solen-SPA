import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import {LearningPathDto} from 'src/app/models/models';
import {ConfirmationDialogComponent} from 'src/app/shared/components';


@Component({
  selector: 'app-learning-paths-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-paths-list.component.scss'],
  template: `
    <app-learning-paths-list-filters [learningPaths]="learningPaths"
                                     (filterChanged)="onFilterChange($event)"
                                     (filterReset)="onFilterReset()">
    </app-learning-paths-list-filters>
    <mat-card>
      <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          <table mat-table [dataSource]="dataSource" matSort [hidden]="dataSource.data.length == 0">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Name</th>
              <td mat-cell *matCellDef="let row"> {{row.name}} </td>
            </ng-container>

            <ng-container matColumnDef="courseCount">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Course Count</th>
              <td mat-cell *matCellDef="let row"> {{row.courseCount}} </td>
            </ng-container>

            <ng-container matColumnDef="learnerCount">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Learner Count</th>
              <td mat-cell *matCellDef="let row">{{row.learnerCount}}</td>
            </ng-container>

            <ng-container matColumnDef="delete">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row">
                <app-delete-icon (clicked)="openDeleteDialog(row.id)"
                                 [disabled]="!row.isDeletable"
                                 tooltip="delete the learning path">
                </app-delete-icon>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectLearningPath(row)">

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
export class LearningPathsListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<LearningPathDto>();
  displayedColumns = ['name', 'courseCount', 'learnerCount', 'delete'];

  @Input() learningPaths: LearningPathDto[];
  @Output() learningPathSelected = new EventEmitter<string>();
  @Output() learningPathDeleted = new EventEmitter<string>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.data = this.learningPaths;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnChanges() {
    this.dataSource.data = this.learningPaths;
  }


  openDeleteDialog(learningPathId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sur to delete this learning path ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.learningPathDeleted.emit(learningPathId);
      }
    });
  }

  onFilterChange(filter: string) {
    this.dataSource.filter = filter;
  }

  onFilterReset() {
    this.dataSource.filter = '';
  }

  selectLearningPath(learningPath: LearningPathDto) {
    this.learningPathSelected.emit(learningPath.id);
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

