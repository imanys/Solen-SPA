import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import {CourseErrorDto, ModuleDto} from 'src/app/models/models';

@Component({
  selector: 'app-modules-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules-list.component.scss'],
  template: `
    <h4 class="subtitle">
      Modules
    </h4>
    <div
      class="modules__list"
      fxLayout="column"
      fxLayoutGap="10px"
      fxLayoutAlign="flex-start"
    >
      <app-modules-list-item
        *ngFor="let module of modules"
        [module]="module"
        [expanded]="module.id == (currentModule?.id || null)"
        [courseErrors]="courseErrors"
        (selected)="onModuleSelected($event)"
      >
      </app-modules-list-item>
    </div>
    <div fxLayout fxLayoutAlign="center" *ngIf="modules.length == 0">
      No modules
    </div>
  `
})
export class ModulesListComponent implements OnInit {
  @Input() modules: ModuleDto[] = [];
  @Input() currentModule: ModuleDto;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() moduleSelected = new EventEmitter<string>();

  ngOnInit() {
    if (this.modules.length > 0) {
      this.moduleSelected.emit(this.modules[0].id);
    }
  }

  onModuleSelected(event: string) {
    this.moduleSelected.emit(event);
  }
}
