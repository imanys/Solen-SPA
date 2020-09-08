import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {
  BlockUserCommand,
  LearningPathForUserDto, LoggedUserDto,
  RoleForUserDto, UnblockUserCommand,
  UpdateUserLearningPathCommand,
  UpdateUserRolesCommand,
  UserDto
} from 'src/app/models';


@Component({
  selector: 'app-user-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-detail.component.scss'],
  template: `
    <h2 class="title">{{user.userName}} </h2>
    <mat-card fxLayout="column" fxFlexAlign="center center">
      <h3 class="section-title">General info</h3>
      <form
        [formGroup]="form"
        fxLayout="column"
        fxLayoutGap="10px"
        autocomplete="off"
      >
        <mat-form-field>
          <input
            matInput
            placeholder="Email"
            [value]="user.email"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Status"
            [value]="user.status"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Joined"
            value="{{user.creationDate | date}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field *ngIf="user.invitedBy">
          <input
            matInput
            placeholder="Invited by"
            value="{{user.invitedBy}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field class="user-detail__select">
          <mat-label>Learning Path</mat-label>
          <mat-select formControlName="learningPathId" required>
            <mat-option
              *ngFor="let learningPath of learningPaths"
              [value]="learningPath.id"
            >
              {{ learningPath.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('learningPathId').hasError('required')">
            The learning path is required
          </mat-error>
        </mat-form-field>
      </form>
      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onSave()">
          <mat-icon>done</mat-icon>
          Save
        </button>
      </div>
    </mat-card>

    <app-user-roles *ngIf="!sameLoggedUser()"
                    [roles]="roles" [user]="user"
                    (rolesUpdated)="onRolesUpdate($event)">
    </app-user-roles>

    <app-user-activation *ngIf="!sameLoggedUser()"
                         [user]="user"
                         (userBlocked)="onUserBlock($event)"
                         (userUnblocked)="onUserUnblock($event)">
    </app-user-activation>

  `
})
export class UserDetailComponent implements OnInit {
  @Input() user: UserDto;
  @Input() learningPaths: LearningPathForUserDto[];
  @Input() roles: RoleForUserDto[];
  @Input() loggedUser: LoggedUserDto;

  @Output() learningPathUpdated = new EventEmitter<UpdateUserLearningPathCommand>();
  @Output() rolesUpdated = new EventEmitter<UpdateUserRolesCommand>();
  @Output() userBlocked = new EventEmitter<BlockUserCommand>();
  @Output() userUnblocked = new EventEmitter<UnblockUserCommand>();

  form = this.fb.group({
    learningPathId: ['', Validators.required],
  });


  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form.patchValue(this.user);
  }

  onSave() {
    const {valid} = this.form;
    if (valid) {
      const userId = this.user.id;
      const learningPathId = this.form.get('learningPathId').value;
      this.learningPathUpdated.emit({userId, learningPathId});
    }
  }

  onRolesUpdate(event: UpdateUserRolesCommand) {
    this.rolesUpdated.emit(event);
  }

  onUserBlock(event: BlockUserCommand) {
    this.userBlocked.emit(event);
  }

  onUserUnblock(event: UnblockUserCommand) {
    this.userUnblocked.emit(event);
  }

  sameLoggedUser(): boolean {
    return this.loggedUser.id === this.user?.id;
  }
}

