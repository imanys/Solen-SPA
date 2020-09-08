import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter, Inject
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {LearningPathDto} from '../../../../../../models';

@Component({
  selector: 'app-invite-members-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['invite-members-dialog.component.scss'],
  template: `
    <h1 mat-dialog-title>Invite members</h1>
    <div mat-dialog-content>
      <form
        [formGroup]="form"
        autocomplete="off"
      >
        <mat-form-field class="learning-path">
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
      <mat-form-field>
        <input
          matInput
          placeholder="Email"
          [(ngModel)]="emailInput"
          [maxlength]="emailMaxLength"
          (keydown.enter)="addMember($event)"
        />
        <button mat-icon-button matSuffix (click)="addMember($event)">
          <mat-icon>add</mat-icon>
        </button>
        <mat-hint align="end">
          {{ emailInput?.length || 0 }}/
          {{ emailMaxLength }}
        </mat-hint>
        <mat-hint class="error" *ngIf="invalidEmail">
          Invalid email address
        </mat-hint>
      </mat-form-field>
      <h4 class="invited-list">Invited list : </h4>
      <mat-list>
        <mat-list-item *ngFor="let email of membersEmails; last as last">
          <h4 mat-line>{{ email}}</h4>
          <button type="button" mat-icon-button>
            <mat-icon (click)="removeMember(email)">delete</mat-icon>
          </button>
          <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
        </mat-list-item>

      </mat-list>
    </div>
    <div mat-dialog-actions align="center" class="actions">
      <button mat-raised-button [mat-dialog-close]="true" color="accent">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="form.invalid || membersEmails.length == 0"
        (click)="onSubmit()"
      >
        Invite
      </button>
    </div>
  `
})
export class InviteMembersDialogComponent {
  emailMaxLength = 50;
  emailInput: string;
  invalidEmail: boolean;
  membersEmails: string[] = [];
  learningPaths: LearningPathDto[];

  invite = new EventEmitter<any>();

  form = this.fb.group({
    learningPathId: ['', Validators.required],
    emails: this.fb.array([])
  });

  constructor(
    public dialogRef: MatDialogRef<InviteMembersDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.learningPaths = data.learningPaths;
  }

  onSubmit() {
    const {valid, value} = this.form;
    if (valid) {
      this.invite.emit({...value});
      this.dialogRef.close();
    }
  }

  addMember(event) {
    if (this.emailInput.length === 0) {
      return;
    }

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!regexp.test(this.emailInput)) {
      this.invalidEmail = true;
      return;
    }

    this.invalidEmail = false;

    const emails = this.form.controls.emails as FormArray;
    if (emails.controls.map(x => x.value).includes(this.emailInput)) {
      this.emailInput = '';
      return;
    }
    emails.push(new FormControl(this.emailInput));
    this.membersEmails.push(this.emailInput);

    this.emailInput = '';
  }

  removeMember(email: string) {
    const emails = this.form.controls.emails as FormArray;
    let i = 0;
    emails.controls.forEach((ctrl: FormControl) => {
      if (ctrl.value === email) {
        emails.removeAt(i);
        return;
      }
      i++;
    });

    this.membersEmails = this.membersEmails.filter(x => x !== email);
  }
}
