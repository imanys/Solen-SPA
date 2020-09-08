import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drag-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
      >drag_indicator</mat-icon
    >
  `
})
export class DragIconComponent {
  @Input() padding = true;
}
