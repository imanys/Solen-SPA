import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LectureDto } from 'src/app/models/models';

@Component({
  selector: 'app-current-lecture',
  styleUrls: ['current-lecture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h4>{{ lecture?.title }}</h4>
      <app-text-display
        *ngIf="lecture?.lectureType === 'Article'"
        [text]="lecture.content"
      ></app-text-display>
      <!-- play video-->
      <app-video-player
        *ngIf="isVideoToDisplay()"
        [videoTitle]="lecture.title"
        [videoUrl]="lecture.videoUrl"
      ></app-video-player>
    </div>
  `
})
export class CurrentLectureComponent {
  @Input() lecture: LectureDto;

  isVideoToDisplay(): boolean {
    return (
      this.lecture &&
      this.lecture.lectureType === 'Video' &&
      this.lecture.videoUrl !== null
    );
  }
}
