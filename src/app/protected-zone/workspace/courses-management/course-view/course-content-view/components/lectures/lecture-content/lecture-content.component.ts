import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LectureDto } from 'src/app/models';

@Component({
  selector: 'app-lecture-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-text-display
      *ngIf="lecture.lectureType === 'Article'"
      [text]="lecture.content"
    ></app-text-display>
    <!-- play video-->
    <app-video-player
      *ngIf="isVideoToDisplay()"
      [videoTitle]="lecture.title"
      [videoUrl]="lecture.videoUrl"
    ></app-video-player>
  `
})
export class LectureContentComponent {
  @Input() lecture: LectureDto;
  @Input() parent: FormGroup;
  @Input() current: boolean;

  @Output() videoUploaded = new EventEmitter<number>();

  isVideoToDisplay(): boolean {
    return (
      this.lecture.lectureType === 'Video' &&
      this.lecture.videoUrl != null &&
      this.current
    );
  }
}
