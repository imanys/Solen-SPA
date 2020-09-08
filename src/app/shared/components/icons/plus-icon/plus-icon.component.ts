import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
              [matTooltip]="tooltip"
      >add</mat-icon
    >
  `
})
export class PlusIconComponent {
  @Input() padding = true;
  @Input() tooltip: string;
}
