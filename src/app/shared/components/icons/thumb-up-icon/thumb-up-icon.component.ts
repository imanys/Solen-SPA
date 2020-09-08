import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-thumb-up-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }">thumb_up</mat-icon>
  `
})
export class ThumbUpIconComponent {
  @Input() padding = true;
  @Input() tooltip: string;
}
