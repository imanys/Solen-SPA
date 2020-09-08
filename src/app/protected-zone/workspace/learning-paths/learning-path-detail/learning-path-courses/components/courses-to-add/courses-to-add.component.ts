import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Inject, EventEmitter} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

import {CourseForLearningPathDto} from 'src/app/models/models';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-courses-to-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses-to-add.component.scss'],
  template: `
    <h1 mat-dialog-title>Adding courses to the learning path</h1>
    <div mat-dialog-content>
      <app-courses-to-add-filters [courses]="courses"
                                  (filterChanged)="onFilterChange($event)"
                                  (filterReset)="onFilterReset()">
      </app-courses-to-add-filters>
      <mat-card>
        <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
          <div fxLayout="row wrap" fxLayoutAlign="center center">
            <table mat-table [dataSource]="dataSource" matSort [hidden]="dataSource.data.length == 0">

              <ng-container matColumnDef="select">
                <th mat-header-cell *matHeaderCellDef>
                  <mat-checkbox (change)="$event ? masterToggle() : null"
                                [checked]="selection.hasValue() && isAllSelected()"
                                [indeterminate]="selection.hasValue() && !isAllSelected()">
                  </mat-checkbox>
                </th>
                <td mat-cell *matCellDef="let row">
                  <mat-checkbox (click)="$event.stopPropagation()"
                                (change)="$event ? selection.toggle(row) : null"
                                [checked]="selection.isSelected(row)">
                  </mat-checkbox>
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
                <td mat-cell *matCellDef="let row"> {{row.title}} </td>
              </ng-container>

              <ng-container matColumnDef="creator">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Creator</th>
                <td mat-cell *matCellDef="let row"> {{row.creator}} </td>
              </ng-container>

              <ng-container matColumnDef="creationDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Creation Date</th>
                <td mat-cell *matCellDef="let row">{{row.creationDate | date}}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let row">{{row.status}}</td>
              </ng-container>

              <ng-container matColumnDef="duration">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Duration</th>
                <td mat-cell *matCellDef="let row">{{row.duration | HoursMinuteSeconds}}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;">

              </tr>
            </table>
          </div>
          <div [hidden]="dataSource?.data?.length > 0">No records found</div>
        </mat-card-content>
      </mat-card>
    </div>
    <div mat-dialog-actions align="center">
      <button mat-raised-button [mat-dialog-close]="true" color="accent">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="selection.selected.length == 0"
        (click)="onAdd()"
      >
        Add
      </button>
    </div>
  `
})
export class CoursesToAddComponent implements OnInit {
  dataSource = new MatTableDataSource<CourseForLearningPathDto>();
  displayedColumns = ['select', 'title', 'creator', 'creationDate', 'status', 'duration'];
  selection = new SelectionModel<CourseForLearningPathDto>(true, []);
  courses: CourseForLearningPathDto[] = [];

  coursesAdd = new EventEmitter<string[]>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<CoursesToAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.courses = this.data.courses;
  }

  ngOnInit() {
    this.dataSource.data = this.courses;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

  }


  onFilterChange(filter: string) {
    this.dataSource.filter = filter;
  }

  onFilterReset() {
    this.dataSource.filter = '';
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onAdd() {
    const selectedCourses = this.selection.selected.map(x => x.id);
    if (selectedCourses.length > 0) {
      this.coursesAdd.emit(selectedCourses);
      this.dialogRef.close();
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
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
