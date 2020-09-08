import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {CourseForLearningPathDto} from 'src/app/models';


@Component({
  selector: 'app-learning-path-courses-filters',
  styleUrls: ['learning-path-courses-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout fxLayoutGap="30px" fxLayoutAlign="start center">
      <mat-form-field *ngFor="let filter of filterSelectObj">
        <mat-label>Filter {{filter.name}}</mat-label>
        <mat-select name="{{filter.columnProp}}" [(ngModel)]="filter.modelValue"
                    (selectionChange)="filterChange(filter,$event)">
          <mat-option value="">All</mat-option>
          <mat-option [value]="item" *ngFor="let item of filter.options">{{item}}</mat-option>
        </mat-select>
      </mat-form-field>
      <div fxFlex fxLayout fxLayoutAlign="end">
        <a class="reset" mat-flat-button (click)="resetFilters()">Reset</a>
      </div>
    </div>
  `
})
export class LearningPathCoursesFiltersComponent implements OnInit {
  @Input() courses: CourseForLearningPathDto[];

  @Output() filterChanged = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter();

  filterValues: any = {};
  filterSelectObj = [
    {
      name: 'Creator',
      columnProp: 'creator',
      options: [],
      modelValue: undefined
    },
    {
      name: 'Status',
      columnProp: 'status',
      options: [],
      modelValue: undefined
    }
  ];

  ngOnInit(): void {
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.courses, o.columnProp);
    });
  }

  filterChange(filter: any, event) {
    this.filterValues[filter.columnProp] = event.source.value.trim().toLowerCase();
    this.filterChanged.emit(JSON.stringify(this.filterValues));
  }

  getFilterObject(fullObj, key) {
    return [...new Set(fullObj.map(item => item[key]))];
  }

  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value) => {
      value.modelValue = undefined;
    });
    this.filterReset.emit();
  }
}

