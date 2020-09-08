import {Component, EventEmitter, Input, Output} from '@angular/core';
import {emit} from 'cluster';

@Component({
  selector: 'app-delete-icon',
  template: `
    <button [disabled]="disabled" mat-icon-button color="warn"
            [disableRipple]="true"
            (click)="onClick($event)">
      <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
                [matTooltip]="tooltip">
        delete
      </mat-icon
      >
    </button>
  `
})
export class DeleteIconComponent {
  @Input() padding = true;
  @Input() tooltip: string;
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.clicked.emit(event);
  }
}
