import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div mat-dialog-content>
      {{ message }}
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="accent" (click)="onNoClick()" cdkFocusInitial>No</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Yes</button>
    </div>
  `
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
