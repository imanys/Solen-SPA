import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

import {LearnerModuleDto, LearnerLectureDto} from 'src/app/models/models';


@Component({
  selector: 'app-module',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['module.component.scss'],
  template: `
    <app-module-expansion-panel
      [hideHeaderRightSideWhenExpanded]="true"
      [expanded]="true"
    >
      <span slot="title">{{ title }}</span>

      <div slot="header-right-side-content">
        {{ module?.duration | HoursMinuteSeconds }}
      </div>

      <mat-list slot="content">
        <mat-list-item
          id="{{ 'id' + lecture.id }}"
          [class.active]="lecture?.id === currentLecture?.id"
          *ngFor="let lecture of module.lectures; let last = last">
          <mat-checkbox [checked]="isLectureCompleted(lecture)" (change)="onChange($event, lecture);"
                        matTooltip="complete the lecture">
          </mat-checkbox>
          <h5 (click)="onSelect(lecture)">{{ lectureTitle(lecture) }}</h5>
          <div fxFlex fxLayout fxLayoutAlign="end" (click)="onSelect(lecture)">
            <app-lecture-icon [lectureType]="lecture.lectureType">
            </app-lecture-icon>
            {{ lecture.duration | HoursMinuteSeconds }}
          </div>
          <mat-divider *ngIf="!last"></mat-divider>
        </mat-list-item>
      </mat-list>
    </app-module-expansion-panel>
  `
})
export class ModuleComponent {
  @Input() module: LearnerModuleDto;
  @Input() currentLecture: LearnerLectureDto;
  @Input() currentModuleId: string;
  @Input() completedLectures: string[];

  @Output() lectureSelected = new EventEmitter<string>();
  @Output() completeLecture = new EventEmitter<string>();
  @Output() uncompleteLecture = new EventEmitter<string>();

  onSelect(lecture: LearnerLectureDto) {
    this.lectureSelected.emit(lecture.id);
  }

  get title(): string {
    return `Module ${this.module.order} : ${this.module.name}`;
  }

  lectureTitle(lecture: LearnerLectureDto): string {
    return `${this.module.order}.${lecture.order}: ${lecture.title}`;
  }

  isLectureCompleted(lecture: LearnerLectureDto): boolean {
    return this.completedLectures.includes(lecture.id);
  }

  onChange(event: MatCheckboxChange, lecture: LearnerLectureDto) {
    if (event.checked) {
      this.completeLecture.emit(lecture.id);
    } else {
      this.uncompleteLecture.emit(lecture.id);
    }
  }
}
