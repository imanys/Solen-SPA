import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minus-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
      >remove</mat-icon
    >
  `
})
export class MinusIconComponent {
  @Input() padding = true;
}
