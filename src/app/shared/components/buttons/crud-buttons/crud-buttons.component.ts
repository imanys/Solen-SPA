import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-buttons',
  styleUrls: ['crud-buttons.component.scss'],
  template: `
    <div *ngIf="isEditing" fxLayout fxLayoutGap="2px">
      <button
        mat-icon-button
        color="accent"
        matTooltip="cancel"
        (click)="onToggleEditing()"
      >
        <mat-icon inline="true" class="button-icon">cancel</mat-icon>
      </button>
      <button
        *ngIf="exists"
        mat-icon-button
        color="primary"
        matTooltip="save"
        (click)="onUpdate()"
        [disabled]="parent.invalid"
      >
        <mat-icon inline="true" class="button-icon">save</mat-icon>
      </button>
      <button
        *ngIf="!exists"
        mat-icon-button
        color="primary"
        matTooltip="add"
        (click)="onCreate()"
        [disabled]="parent.invalid"
      >
        <mat-icon inline="true" class="button-icon"
          >add_circle_outline</mat-icon
        >
      </button>
    </div>
    <div *ngIf="!isEditing" fxLayout fxLayoutGap="2px">
      <button
        mat-icon-button
        color="warn"
        matTooltip="delete"
        (click)="onDelete()"
      >
        <mat-icon inline="true" class="button-icon">delete_forever</mat-icon>
      </button>
      <button
        mat-icon-button
        color="primary"
        matTooltip="edit"
        (click)="onToggleEditing()"
      >
        <mat-icon inline="true" class="button-icon">edit</mat-icon>
      </button>
    </div>
  `
})
export class CrudButtonsComponent {
  @Input() exists: boolean;
  @Input() parent: FormGroup;
  @Input() isEditing: boolean;

  @Output() toggleEditing = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggleEditing() {
    this.toggleEditing.emit();
  }

  onUpdate() {
    this.update.emit();
  }

  onCreate() {
    this.create.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
