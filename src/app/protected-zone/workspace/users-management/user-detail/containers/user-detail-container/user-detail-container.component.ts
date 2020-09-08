import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../store';

import {
  BlockUserCommand,
  LearningPathForUserDto, LoggedUserDto,
  RoleForUserDto, UnblockUserCommand,
  UpdateUserLearningPathCommand,
  UpdateUserRolesCommand,
  UserDto
} from 'src/app/models';
import * as fromRouter from 'src/app/app-routing/store';
import * as fromAuth from 'src/app/auth/store';


@Component({
  selector: 'app-user-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-go-back-button (clicked)="onGoBackClick()"></app-go-back-button>
    <app-user-detail [user]="user$ | async"
                     [learningPaths]="learningPaths$ | async"
                     [roles]="roles$ | async"
                     [loggedUser]="loggedUser$ | async"
                     (learningPathUpdated)="onLearningPathUpdate($event)"
                     (rolesUpdated)="onRolesUpdate($event)"
                     (userBlocked)="onUserBlock($event)"
                     (userUnblocked)="onUserUnblock($event)">

    </app-user-detail>
  `
})
export class UserDetailContainerComponent implements OnInit {
  user$: Observable<UserDto>;
  learningPaths$: Observable<LearningPathForUserDto[]>;
  roles$: Observable<RoleForUserDto[]>;
  loggedUser$: Observable<LoggedUserDto>;

  constructor(private store: Store<fromStore.UserState>) {
  }

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUser);
    this.learningPaths$ = this.store.select(fromStore.getLearningPaths);
    this.roles$ = this.store.select(fromStore.getRoles);
    this.loggedUser$ = this.store.select(fromAuth.getLoggedUser);
  }

  onLearningPathUpdate(event: UpdateUserLearningPathCommand) {
    this.store.dispatch(fromStore.updateUserLearningPath(event));
  }

  onRolesUpdate(event: UpdateUserRolesCommand) {
    this.store.dispatch(fromStore.updateUserRoles(event));
  }

  onUserBlock(event: BlockUserCommand) {
    this.store.dispatch(fromStore.blockUser(event));
  }

  onUserUnblock(event: UnblockUserCommand) {
    this.store.dispatch(fromStore.unblockUser(event));
  }

  onGoBackClick() {
    this.store.dispatch(
      fromRouter.go({path: ['/workspace/users']})
    );
  }
}

