import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromComponents from '../../components';

import {InviteMembersCommand, LearningPathDto} from 'src/app/models';


@Component({
  selector: 'app-invite-members-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['invite-members-container.component.scss'],
  template: `
    <button mat-mini-fab color="primary" matTooltip="Invite new members"
            (click)="openCreateLearningPathDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `
})
export class InviteMembersContainerComponent implements OnInit, OnDestroy {
  learningPaths: LearningPathDto[];
  learningPathSubscription: Subscription;

  constructor(
    private store: Store<fromStore.UsersState>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.learningPathSubscription = this.store.select(fromStore.getLearningPaths)
      .subscribe(learningPaths => this.learningPaths = learningPaths);
  }

  openCreateLearningPathDialog() {
    const dialogRef = this.dialog.open(
      fromComponents.InviteMembersDialogComponent,
      {
        height: '400px',
        width: '600px',
        data: {
          learningPaths: this.learningPaths
        }
      }
    );

    dialogRef.componentInstance.invite.subscribe(
      (command: InviteMembersCommand) => {
        this.store.dispatch(fromStore.inviteMembers(command));
      }
    );
  }

  ngOnDestroy() {
    if (this.learningPathSubscription) {
      this.learningPathSubscription.unsubscribe();
    }
  }


}
