import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ConfirmationDialogComponent} from 'src/app/shared/components';
import {CourseDto} from 'src/app/models';

@Component({
  selector: 'app-course-info-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-info-header.component.scss'],
  template: `
    <mat-card>
      <mat-card-title fxLayout>
        <div>
          {{ course?.title }}
          <mat-card-subtitle> {{ course?.subtitle }}</mat-card-subtitle>
        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end">
          <div fxLayout="column" fxLayoutAlign="center" fxLayoutGap="5px">
            <button mat-mini-fab color="primary" (click)="onFinishEditing()" matTooltip="Finish editing">
              <mat-icon>done</mat-icon>
            </button>
            <button mat-mini-fab color="warn" (click)="openDeleteDialog()" matTooltip="Delete the course">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </mat-card-title>
    </mat-card>
  `
})
export class CourseInfoHeaderComponent {
  @Input() course: CourseDto;
  @Input() deletionMessage: string;

  @Output() delete = new EventEmitter<string>();
  @Output() finishEditing = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.deletionMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.course.id);
      }
    });
  }

  onFinishEditing() {
    this.finishEditing.emit(this.course.id);
  }
}
