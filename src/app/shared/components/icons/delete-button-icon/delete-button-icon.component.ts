import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button-icon',
  styleUrls: ['delete-button-icon.component.scss'],
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
export class DeleteButtonIconComponent {
  @Input() color = 'warn';
  @Input() tooltip: string;
  @Input() iconName = 'delete';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
