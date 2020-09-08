import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UpdateOrganizationInfoCommand} from '../../../../../../models';


@Component({
  selector: 'app-organization-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['organization-info.component.scss'],
  template: `
    <mat-card fxLayout="column" fxFlexAlign="center center">
      <form
        [formGroup]="form"
        fxLayout="column"
        fxLayoutGap="10px"
        autocomplete="off"
      >
        <mat-form-field>
          <input
            matInput
            placeholder="Name"
            formControlName="name"
            [maxlength]="nameMaxlength"
            required
          />
          <mat-hint align="end">
            {{ form.get('name').value?.length || 0 }}/
            {{ nameMaxlength }}
          </mat-hint>
          <mat-error *ngIf="form.get('name').hasError('required')">
            The name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Subscription Plan"
            value="{{subscriptionPlan}}"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Maximum storage"
            value="{{formatBytes(maxStorage) }}"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Current storage"
            value="{{ formatBytes(currentStorage)}} ({{ storageRatio | percent}})"
            disabled
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Users Count"
            value="{{ usersCount }}"
            disabled
          />
        </mat-form-field>
      </form>
      <div fxLayout fxFlexAlign="center">
        <button mat-raised-button color="primary" matTooltip="Save" (click)="onSave()">
          <mat-icon>done</mat-icon>
          Save
        </button>
      </div>
    </mat-card>
  `
})
export class OrganizationInfoComponent implements OnInit {
  @Input() organizationName: string;
  @Input() subscriptionPlan: string;
  @Input() maxStorage: number;
  @Input() currentStorage: number;
  @Input() usersCount: number;

  @Output() updated = new EventEmitter<UpdateOrganizationInfoCommand>();

  nameMaxlength = 60;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxlength)]]
  });

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form.get('name').setValue(this.organizationName);
  }

  onSave() {
    const {valid} = this.form;
    if (valid) {
      this.updated.emit({organizationName: this.form.get('name').value});
    }
  }

  get storageRatio() {
    return this.currentStorage / this.maxStorage;
  }

  formatBytes(bytes, decimals = 0) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


}

