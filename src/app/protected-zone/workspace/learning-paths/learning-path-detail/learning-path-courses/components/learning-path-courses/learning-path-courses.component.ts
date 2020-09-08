import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import {
  CourseForLearningPathDto,
  LearningPathDto,
  RemoveCourseFromLearningPathCommand
} from 'src/app/models/models';
import {ConfirmationDialogComponent} from 'src/app/shared/components';
import {moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-learning-path-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path-courses.component.scss'],
  template: `
    <app-learning-path-courses-filters [courses]="courses"
                                       (filterChanged)="onFilterChange($event)"
                                       (filterReset)="onFilterReset()">
    </app-learning-path-courses-filters>
    <mat-card>
      <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          <table mat-table [dataSource]="dataSource" matSort cdkDropList (cdkDropListDropped)="drop($event)">

            <ng-container matColumnDef="order">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Order</th>
              <td mat-cell *matCellDef="let row"> {{row.order}} </td>
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

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>
                <app-plus-icon (click)="onAddCourses()"
                               tooltip="add courses to the learning path">

                </app-plus-icon>
              </th>
              <td mat-cell *matCellDef="let row">
                <app-delete-icon (clicked)="openDeleteDialog(row.id)"
                                 tooltip="remove course from learning path">
                </app-delete-icon>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" cdkDrag>
            </tr>
          </table>
        </div>

        <div [hidden]="dataSource.data.length == 0">
          <mat-paginator [pageSize]="10" [pageSizeOptions]="[10, 20, 50]">
          </mat-paginator>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class LearningPathCoursesComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<CourseForLearningPathDto>();
  displayedColumns = ['order', 'title', 'creator', 'creationDate', 'status', 'duration', 'action'];

  @Input() learningPath: LearningPathDto;
  @Input() courses: CourseForLearningPathDto[];
  @Output() removeCourse = new EventEmitter<RemoveCourseFromLearningPathCommand>();
  @Output() addCourses = new EventEmitter<string>();
  @Output() coursesOrdered = new EventEmitter<CourseForLearningPathDto[]>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog) {
  }


  ngOnInit() {
    this.dataSource.data = this.courses;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnChanges() {
    this.dataSource.data = this.courses;
  }

  openDeleteDialog(courseId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sur to remove this course from the learning path ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const command = {courseId, learningPathId: this.learningPath.id};
        this.removeCourse.emit(command);
      }
    });
  }

  onAddCourses() {
    this.addCourses.emit(this.learningPath.id);
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

  drop(event) {
    const courses = [...this.courses];
    moveItemInArray(courses, event.previousIndex, event.currentIndex);
    this.coursesOrdered.emit(courses);
  }
}
