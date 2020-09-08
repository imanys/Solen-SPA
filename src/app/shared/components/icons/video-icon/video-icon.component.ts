import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
      >slideshow</mat-icon
    >
  `
})
export class VideoIconComponent {
  @Input() padding = true;
}
