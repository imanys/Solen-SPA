import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import * as fromStore from '../../../shared/store';
import * as fromComponents from '../../components';

import {CreateLearningPathCommand} from 'src/app/models';

@Component({
  selector: 'app-learning-path-creation-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path-creation-container.component.scss'],
  template: `
    <button mat-mini-fab color="primary" matTooltip="Add a new learning path"
            (click)="openCreateLearningPathDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `
})
export class LearningPathCreationContainerComponent {

  constructor(
    private store: Store<fromStore.LearningPathsState>,
    private dialog: MatDialog
  ) {
  }

  openCreateLearningPathDialog() {
    const dialogRef = this.dialog.open(
      fromComponents.LearningPathCreateDialogComponent,
      {
        width: '600px'
      }
    );

    dialogRef.componentInstance.create.subscribe(
      (command: CreateLearningPathCommand) => {
        this.store.dispatch(fromStore.createLearningPath(command));
      }
    );
  }


}
