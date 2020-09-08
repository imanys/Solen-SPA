import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LearnerLectureDto } from 'src/app/models/models';

@Component({
  selector: 'app-lecture',
  styleUrls: ['lecture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="title">
        {{ lecture?.title }}
      </div>
      <div class="content">
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

    </div>
  `
})
export class LectureComponent {
  @Input() lecture: LearnerLectureDto;

  isVideoToDisplay(): boolean {
    return (
      this.lecture &&
      this.lecture.lectureType === 'Video' &&
      this.lecture.videoUrl !== null
    );
  }
}
