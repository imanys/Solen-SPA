import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

import {
  RoleForUserDto,
  UpdateUserRolesCommand,
  UserDto
} from 'src/app/models';
import {MatCheckboxChange} from '@angular/material/checkbox';


@Component({
  selector: 'app-user-roles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-roles.component.scss'],
  template: `

    <mat-card fxLayout="column" fxFlexAlign="center center" class="roles-section">
      <h3 class="section-title">User roles</h3>
      <form
        [formGroup]="form"
        fxLayout="column"
        fxLayoutGap="20px"
        autocomplete="off"
      >
        <div *ngFor="let role of roles; let i=index">
          <mat-checkbox type="checkbox" [value]="role.id" (change)="onCheckChange($event, role.id)"
                        [checked]="user.rolesIds.includes(role.id)" required>
            {{role.name}} ({{role.description}})
          </mat-checkbox>
        </div>
      </form>

      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onRolesSave()">
          <mat-icon>done</mat-icon>
          Save
        </button>
      </div>
    </mat-card>
  `
})
export class UserRolesComponent implements OnInit {
  @Input() user: UserDto;
  @Input() roles: RoleForUserDto[];

  @Output() rolesUpdated = new EventEmitter<UpdateUserRolesCommand>();


  form = this.fb.group({
    rolesIds: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form.patchValue(this.user);
    const formArray: FormArray = this.form.get('rolesIds') as FormArray;
    this.user.rolesIds.forEach(roleId => formArray.push(new FormControl(roleId)));
  }


  onRolesSave() {
    const userId = this.user.id;
    const rolesIds = this.form.get('rolesIds').value;

    this.rolesUpdated.emit({userId, rolesIds});
  }


  onCheckChange(event: MatCheckboxChange, roleId: string) {
    const formArray: FormArray = this.form.get('rolesIds') as FormArray;
    if (event.checked) {
      formArray.push(new FormControl(roleId));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === roleId) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


}

