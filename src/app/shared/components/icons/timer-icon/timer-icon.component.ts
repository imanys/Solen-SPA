import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer-icon',
  styleUrls: ['timer-icon.component.scss'],
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
      >timer</mat-icon
    >
  `
})
export class TimerIconComponent {
  @Input() padding = true;
}
