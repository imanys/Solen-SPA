import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {
  ModuleDto,
  UpdateModuleCommand,
  CreateModuleCommand, CourseErrorDto
} from 'src/app/models/models';

@Component({
  selector: 'app-modules-list-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['modules-list.component.scss'],
  template: `
    <h4 class="subtitle">
      Modules
    </h4>
    <div
      class="modules__list"
      fxLayout="column"
      fxLayoutGap="20px"
      fxLayoutAlign="flex-start"
      cdkDropList
      (cdkDropListDropped)="drop($event)"
    >
      <app-modules-list-item
        cdkDrag
        cdkDragLockAxis="y"
        *ngFor="let module of modules"
        [module]="module"
        [expanded]="module.id == (currentModule?.id || null)"
        [courseErrors]="courseErrors"
        (selected)="onModuleSelected($event)"
        (updated)="onModuleUpdated($event)"
        (deleted)="onModuleDeleted($event)"
        [deletionMessage]="deletionMessage"
      >
        <app-drag-icon slot="drag-handle" cdkDragHandle></app-drag-icon>
      </app-modules-list-item>
      <app-modules-list-item-new
        *ngIf="displayNewModuleForm"
        [expanded]="true"
        (created)="onModuleCreated($event)"
        (canceled)="toggleDisplayNewModuleForm()"
      >
      </app-modules-list-item-new>
      <!-- New module -->
      <div fxLayout fxLayoutAlign="center">
        <button mat-mini-fab color="primary" *ngIf="!displayNewModuleForm" (click)="toggleDisplayNewModuleForm()"
                matTooltip="Add a new module">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `
})
export class ModulesListComponent implements OnInit {
  @Input() courseId: string;
  @Input() modules: ModuleDto[] = [];
  @Input() currentModule: ModuleDto;
  @Input() deletionMessage: string;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() moduleSelected = new EventEmitter<string>();
  @Output() modulesOrdred = new EventEmitter<ModuleDto[]>();
  @Output() moduleCreated = new EventEmitter<CreateModuleCommand>();
  @Output() moduleUpdated = new EventEmitter<UpdateModuleCommand>();
  @Output() moduleDeleted = new EventEmitter<string>();
  @Output() newModule = new EventEmitter<void>();

  displayNewModuleForm = false;

  ngOnInit() {
    if (this.modules.length > 0) {
      this.moduleSelected.emit(this.modules[0].id);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);

    this.modulesOrdred.emit(this.modules);
  }

  toggleDisplayNewModuleForm() {
    this.displayNewModuleForm = !this.displayNewModuleForm;

    if (this.displayNewModuleForm) {
      this.newModule.emit();
    }
  }

  onModuleSelected(event: string) {
    this.moduleSelected.emit(event);
  }

  onModuleCreated(event: ModuleDto) {
    this.moduleCreated.emit({
      ...event,
      courseId: this.courseId,
      order: this.modules.length + 1
    });
    this.toggleDisplayNewModuleForm();
  }

  onModuleUpdated(event: UpdateModuleCommand) {
    this.moduleUpdated.emit(event);
  }

  onModuleDeleted(event: string) {
    this.moduleDeleted.emit(event);
  }
}
