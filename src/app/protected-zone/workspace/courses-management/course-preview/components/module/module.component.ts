import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { ModuleDetailDto, LectureDto } from 'src/app/models/models';

@Component({
  selector: 'app-module-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['module.component.scss'],
  template: `
      <app-expansion-panel
              [hideHeaderRightSideWhenExpanded]="true"
              [expanded]="firstModule"
      >
          <span slot="title">{{ title }}</span>

          <div slot="header-right-side-content">
              {{ module?.moduleInfo.duration | HoursMinuteSeconds }}
          </div>

          <mat-list slot="content">
              <mat-list-item
                      [class.active]="lecture?.id === currentLecture?.id"
                      *ngFor="let lecture of module.lectures; let last = last"
                      (click)="onSelect(lecture)"
              >
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
export class ModuleComponent implements OnInit {
  @Input() module: ModuleDetailDto;
  @Input() firstModule: boolean;
  @Input() currentLecture: LectureDto;

  @Output() lectureSelected = new EventEmitter<string>();

  ngOnInit() {
    if (this.firstModule && this.module.lectures.length > 0) {
      this.lectureSelected.emit(this.module.lectures[0].id);
    }
  }

  onSelect(lecture: LectureDto) {
    this.lectureSelected.emit(lecture.id);
  }

  get title(): string {
    return `Module ${this.module.moduleInfo.order} : ${this.module.moduleInfo.name}`;
  }

  lectureTitle(lecture: LectureDto): string {
    return `${this.module.moduleInfo.order}.${lecture.order}: ${lecture.title}`;
  }
}
