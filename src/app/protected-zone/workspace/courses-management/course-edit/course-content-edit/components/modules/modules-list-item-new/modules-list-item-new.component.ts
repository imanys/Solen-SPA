import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ModuleDto } from 'src/app/models/models';

@Component({
  selector: 'app-modules-list-item-new',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules-list-item-new.component.scss'],
  template: `
    <app-expansion-panel [expanded]="expanded">
      <span slot="title">{{ title }}</span>

      <div slot="content">
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
              (keydown.enter)="onKeydown($event)"
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
        </form>
      </div>
      <div slot="actions">
        <app-create-button-icon
          (saved)="create()"
          (canceled)="cancel()"
          tooltip="create module"
        >
        </app-create-button-icon>
      </div>
    </app-expansion-panel>
  `
})
export class ModulesListItemNewComponent {
  nameMaxlength = 100;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxlength)]]
  });

  @Input() module: ModuleDto;
  @Input() expanded: boolean;

  @Output() created = new EventEmitter<ModuleDto>();
  @Output() canceled = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get title(): string {
    return 'New module';
  }

  create() {
    const { value, valid, touched } = this.form;
    if (valid && touched) {
      this.created.emit({ ...value });
    }
  }

  cancel() {
    this.canceled.emit();
  }

  onKeydown(event: KeyboardEvent) {
    this.form.markAsTouched();

    this.create();
  }
}
