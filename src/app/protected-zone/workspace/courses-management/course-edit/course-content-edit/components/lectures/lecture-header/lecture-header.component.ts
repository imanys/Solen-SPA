import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LectureDto } from 'src/app/models';

@Component({
  selector: 'app-lecture-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <app-lecture-icon [lectureType]="lecture.lectureType"></app-lecture-icon>
      {{ lecture?.duration | HoursMinuteSeconds }}
  `
})
export class LectureHeaderComponent {
  @Input() lecture: LectureDto;
}
