import {Component, Input, ChangeDetectionStrategy, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {
  LearnerCourseAuthorFilterDto,
  LearnerCourseOrderByDto,
  LearnerCoursesFilter
} from '../../../../../../models';

@Component({
  selector: 'app-courses-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses-filters.component.scss'],
  template: `
    <form [formGroup]="form" autocomplete="off">
      <div fxLayout fxLayoutGap="20px">
        <mat-form-field>
          <mat-label>Sort by</mat-label>
          <mat-select formControlName="orderBy">
            <mat-option *ngFor="let orderBy of orderBys" [value]="orderBy.id">
              {{orderBy.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Creator</mat-label>
          <mat-select formControlName="authorId">
            <mat-option value="">All</mat-option>
            <mat-option *ngFor="let author of authors" [value]="author.id">
              {{author.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <a  class="reset" mat-flat-button (click)="resetFilter()">Reset</a>
      </div>
    </form>
  `
})
export class CoursesFiltersComponent implements OnInit, OnChanges {
  @Input() orderBys: LearnerCourseOrderByDto[];
  @Input() authors: LearnerCourseAuthorFilterDto[];
  @Input() currentFilter: LearnerCoursesFilter;

  @Output() filterUpdated = new EventEmitter<LearnerCoursesFilter>();
  @Output() filterReset = new EventEmitter();

  form = this.fb.group({
    orderBy: '',
    authorId: '',
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges
      .subscribe((values) => this.filterUpdated.emit({...this.currentFilter, page: 1, ...values}));
  }

  resetFilter() {
    this.filterReset.emit();
  }

  ngOnChanges(changes): void {
    this.form.patchValue(this.currentFilter, {emitEvent: false});
  }
}
