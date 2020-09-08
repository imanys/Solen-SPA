import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LectureDto} from 'src/app/models';

@Component({
  selector: 'app-lecture-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <div *ngIf="lecture.lectureType === 'Article'" fxLayout="column" class="control-group">
      <label>Content</label>
      <app-text-editor
        [parent]="parent"
        controlName="content"
      ></app-text-editor>
    </div>
    <!-- play video-->
    <app-video-player
      *ngIf="isVideoToDisplay()"
      [videoTitle]="lecture.title"
      [videoUrl]="lecture.videoUrl"
    ></app-video-player>
    <!-- upload video-->
    <app-lecture-video-upload
      *ngIf="isVideoToUpload()"
      (videoUploaded)="onVideoUploaded($event)"
      (errorOccurred)="onErrorOccurred($event)"
      [lectureId]="lecture.id"
      [lectureType]="lecture.lectureType"
    ></app-lecture-video-upload>
  `
})
export class LectureContentComponent {
  @Input() lecture: LectureDto;
  @Input() parent: FormGroup;
  @Input() current: boolean;

  @Output() videoUploaded = new EventEmitter<number>();
  @Output() errorOccurred = new EventEmitter<any>();

  isVideoToDisplay(): boolean {
    return (
      this.lecture.lectureType === 'Video' &&
      this.lecture.videoUrl != null &&
      this.current
    );
  }

  isVideoToUpload(): boolean {
    return this.lecture.lectureType === 'Video' && this.lecture.videoUrl == null;
  }

  onVideoUploaded(event: number) {
    this.videoUploaded.emit(event);
  }

  onErrorOccurred(event: any) {
    this.errorOccurred.emit(event);
  }
}
