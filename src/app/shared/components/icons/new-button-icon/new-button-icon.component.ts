import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-button-icon',
  styleUrls: ['new-button-icon.component.scss'],
  template: `
    <button
      mat-icon-button
      [color]="color"
      [matTooltip]="tooltip"
      (click)="onClick()"
    >
      <mat-icon inline="true" class="button-icon">{{ iconName }}</mat-icon>
    </button>
  `
})
export class NewButtonIconComponent {
  @Input() color = 'primary';
  @Input() tooltip: string;
  @Input() iconName = 'add';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
