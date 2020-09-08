import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {NotificationTemplateDto} from 'src/app/models/models';


@Component({
  selector: 'app-templates-list-filters',
  styleUrls: ['templates-list-filters.component.scss'],
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
      <mat-checkbox (change)="onActiveChange($event);" #checkbox>
        Only active notifications
      </mat-checkbox>
      <div fxFlex fxLayout fxLayoutAlign="end">
        <a class="reset" mat-flat-button (click)="resetFilters()">Reset</a>
      </div>
    </div>
  `
})
export class TemplatesListFiltersComponent implements OnInit {
  @Input() templates: NotificationTemplateDto[];

  @Output() filterChanged = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter();

  @ViewChild('checkbox') checkbox: MatCheckbox;

  filterValues: any = {};
  filterSelectObj = [
    {
      name: 'Type',
      columnProp: 'type',
      options: [],
      modelValue: undefined
    }
  ];

  ngOnInit(): void {
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.templates, o.columnProp);
    });
  }

  filterChange(filter: any, event) {
    this.filterValues[filter.columnProp] = event.source.value.trim().toLowerCase();
    this.filterChanged.emit(JSON.stringify(this.filterValues));
  }

  getFilterObject(fullObj, key) {
    return [...new Set(fullObj.map(item => item[key]))];
  }

  onActiveChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.filterValues.isActivated = 'true';
    } else {
      this.filterValues.isActivated = '';
    }

    this.filterChanged.emit(JSON.stringify(this.filterValues));
  }

  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value) => {
      value.modelValue = undefined;
    });
    this.checkbox.checked = false;
    this.filterReset.emit();
  }
}

