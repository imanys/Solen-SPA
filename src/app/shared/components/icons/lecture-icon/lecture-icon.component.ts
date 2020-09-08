import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lecture-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-video-icon *ngIf="lectureType == 'Video'"></app-video-icon>
    <app-article-icon *ngIf="lectureType == 'Article'"></app-article-icon>
  `
})
export class LectureIconComponent {
  @Input() lectureType: string;
}
