import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {CourseErrorDto, ModuleDto} from 'src/app/models/models';

@Component({
  selector: 'app-modules-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules-list-item.component.scss'],
  template: `
    <a (click)="onSelect()">
      <app-expansion-panel [expanded]="expanded" [errors]="moduleErrors.length > 0">
        <span slot="title">{{ title }}</span>

        <div slot="header-right-side-content">
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
              <input matInput placeholder="Name" formControlName="name"/>
            </mat-form-field>
          </form>
          <app-errors-display [errors]="moduleErrors"></app-errors-display>
        </div>
      </app-expansion-panel>
    </a>
  `
})
export class ModulesListItemComponent implements OnInit {
  form = this.fb.group({
    name: '',
  });

  @Input() module: ModuleDto;
  @Input() expanded: boolean;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() selected = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.patchValue(this.module);

    this.form.disable();
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
}
