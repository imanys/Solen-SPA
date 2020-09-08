import {Component, ChangeDetectionStrategy, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {LearnerCompletedCoursesDto, LearnerForLearningPathDto} from 'src/app/models/models';


@Component({
  selector: 'app-learning-path-learners',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path-learners.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  template: `
    <app-learning-path-learners-filters [learners]="learners"
                                        (filterChanged)="onFilterChange($event)"
                                        (filterReset)="onFilterReset()">
    </app-learning-path-learners-filters>
    <mat-card>
      <mat-card-content fxLayout="column" fxFlexAlign="center center" fxLayoutGap="20px">
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          <table mat-table [dataSource]="dataSource" multiTemplateDataRows matSort [hidden]="dataSource.data.length == 0">

            <ng-container matColumnDef="userName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>User Name</th>
              <td mat-cell *matCellDef="let row"> {{row.userName}} </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
              <td mat-cell *matCellDef="let row"> {{row.email}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let row">{{row.status}}</td>
            </ng-container>

            <ng-container matColumnDef="expandedDetail">
              <td mat-cell *matCellDef="let element" [attr.colspan]="displayedColumns.length">
                <div class="detail"
                     [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
                  <div class="progress">
                    Progress : <strong>{{progress}}% </strong> (<strong>{{completedCourses}}</strong> course(s) completed out
                    of <strong>{{totalCourses}}</strong>)
                  </div>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                (click)="onLoadLearnerProgress(row.id);expandedElement = expandedElement === row ? null : row">

            </tr>
            <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="detail-row"></tr>
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
export class LearningPathLearnersComponent implements OnInit {
  dataSource = new MatTableDataSource<LearnerForLearningPathDto>();
  displayedColumns = ['userName', 'email', 'status'];
  expandedElement: LearnerForLearningPathDto | null;

  @Input() learners: LearnerForLearningPathDto[];
  @Input() learnerProgress: LearnerCompletedCoursesDto;

  @Output() loadLearnerProgress = new EventEmitter<string>();


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.data = this.learners;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  get completedCourses(): number {
    return this.learnerProgress?.completedCourses.length;
  }

  get totalCourses(): number {
    return this.learnerProgress?.learningPathCourseCount;
  }

  get progress() {
    if (!this.learnerProgress || this.totalCourses === 0) {
      return 0;
    }
    return ((this.completedCourses / this.totalCourses) * 100).toFixed();
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

  onLoadLearnerProgress(id: string) {
    if (!this.expandedElement) {
      this.loadLearnerProgress.emit(id);
    }

  }
}
