import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-button-icon',
  styleUrls: ['create-button-icon.component.scss'],
  template: `
    <button
      mat-icon-button
      color="accent"
      matTooltip="cancel"
      (click)="onCancelClick()"
    >
      <mat-icon inline="true" class="button-icon">{{
        cancelIconName
      }}</mat-icon>
    </button>
    <button
      mat-icon-button
      [color]="color"
      [matTooltip]="tooltip"
      (click)="onSaveClick()"
    >
      <mat-icon inline="true" class="button-icon">{{ saveIconName }}</mat-icon>
    </button>
  `
})
export class CreateButtonIconComponent {
  @Input() color = 'primary';
  @Input() tooltip: string;
  @Input() saveIconName = 'save';
  @Input() cancelIconName = 'cancel';

  @Output() saved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  onSaveClick() {
    this.saved.emit();
  }

  onCancelClick() {
    this.canceled.emit();
  }
}
