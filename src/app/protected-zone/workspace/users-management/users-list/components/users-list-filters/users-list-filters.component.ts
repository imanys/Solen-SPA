import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {UsersListItemDto} from 'src/app/models';


@Component({
  selector: 'app-users-list-filters',
  styleUrls: ['users-list-filters.component.scss'],
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
export class UsersListFiltersComponent implements OnInit {
  @Input() users: UsersListItemDto[];

  @Output() filterChanged = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter();

  filterValues: any = {};
  filterSelectObj = [
    {
      name: 'Username',
      columnProp: 'userName',
      options: [],
      modelValue: undefined
    },
    {
      name: 'Learning Path',
      columnProp: 'learningPath',
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
      o.options = this.getFilterObject(this.users, o.columnProp);
    });
  }

  filterChange(filter: any, event) {
    this.filterValues[filter.columnProp] = event.source.value?.trim().toLowerCase();
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

