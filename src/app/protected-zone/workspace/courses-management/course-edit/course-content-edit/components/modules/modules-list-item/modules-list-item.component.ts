import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {CourseErrorDto, ModuleDto, UpdateModuleCommand} from 'src/app/models/models';
import {ConfirmationDialogComponent} from 'src/app/shared/components/ui/confirmation-dialog/confirmation-dialog.component';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-modules-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules-list-item.component.scss'],
  template: `
    <a (click)="onSelect()">
      <app-expansion-panel [expanded]="expanded" [errors]="moduleErrors.length > 0">
        <span slot="title">{{ title }}</span>

        <ng-content select="[slot=drag-handle]" slot="drag-handle">
        </ng-content>

        <div slot="header-right-side-content">
          <app-delete-icon (clicked)="openDeleteDialog()" tooltip="delete module"></app-delete-icon>
          {{ module?.duration | HoursMinuteSeconds }}
        </div>

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
          <app-errors-display [errors]="moduleErrors"></app-errors-display>
        </div>
      </app-expansion-panel>
    </a>
  `
})
export class ModulesListItemComponent implements OnInit {
  nameMaxlength = 100;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxlength)]]
  });

  @Input() module: ModuleDto;
  @Input() expanded: boolean;
  @Input() deletionMessage: string;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() selected = new EventEmitter<string>();
  @Output() updated = new EventEmitter<UpdateModuleCommand>();
  @Output() deleted = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form.patchValue(this.module);

    this.form.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => this.update());
  }

  get title(): string {
    return `Module ${this.module.order} : ${this.module.name}`;
  }

  get moduleErrors() {
    return this.courseErrors.filter(x => x.moduleId === this.module?.id).map(x => x.error);
  }

  onSelect() {
    this.selected.emit(this.module.id);
  }

  update() {
    const {value, valid} = this.form;
    if (valid) {
      this.updated.emit({moduleId: this.module.id, ...value});
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.deletionMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.module.id);
      }
    });
  }
}
