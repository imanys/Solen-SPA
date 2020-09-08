import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-go-back-button',
  styleUrls: ['go-back-button.component.scss'],
  template: `
    <button
      mat-button
      [matTooltip]="tooltip"
      [color]="color"
      (click)="onClick()"
    >
      <mat-icon>{{ iconName }}</mat-icon>
      {{ text }}
    </button>
  `
})
export class GoBackButtonIconComponent {
  @Input() color = 'accent';
  @Input() tooltip: string;
  @Input() iconName = 'keyboard_arrow_left';
  @Input() text = 'Go back';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
