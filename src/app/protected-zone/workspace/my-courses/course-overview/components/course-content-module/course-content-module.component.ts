import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {LearnerLectureOverviewDto, LearnerModuleOverviewDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-content-module',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <app-expansion-panel
      [hideHeaderRightSideWhenExpanded]="true"
      [expanded]="expanded"
    >
      <span slot="title">{{ title }}</span>

      <div slot="header-right-side-content">
        {{ module?.duration | HoursMinuteSeconds }}
      </div>

      <mat-list slot="content">
        <mat-list-item *ngFor="let lecture of module.lectures; let last = last">
          <h4 mat-line>
            {{ lectureTitle(lecture) }}
          </h4>

          <app-lecture-icon [lectureType]="lecture.lectureType">
          </app-lecture-icon>
          {{ lecture.duration | HoursMinuteSeconds }}
          <mat-divider *ngIf="!last"></mat-divider>
        </mat-list-item>
      </mat-list>
    </app-expansion-panel>
  `
})
export class CourseContentModuleComponent {
  @Input() module: LearnerModuleOverviewDto;
  @Input() expanded: boolean;

  get title(): string {
    return `Module ${this.module.order} : ${this.module.name}`;
  }

  lectureTitle(lecture: LearnerLectureOverviewDto): string {
    return `${this.module.order}.${lecture.order}: ${lecture.title}`;
  }
}
