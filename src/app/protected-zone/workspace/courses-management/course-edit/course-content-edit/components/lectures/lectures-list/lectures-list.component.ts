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
  LectureDto,
  ModuleDto,
  UpdateLectureCommand,
  CreateLectureCommand,
  LectureType, CourseErrorDto
} from 'src/app/models';

@Component({
  selector: 'app-lectures-list-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures-list.component.scss'],
  template: `
    <h4 class="subtitle">Lectures</h4>
    <div
      class="lectures__list"
      fxLayout="column"
      fxLayoutGap="8px"
      fxLayoutAlign="flex-start"
      cdkDropList
      (cdkDropListDropped)="drop($event)"
    >
      <app-lectures-list-item
        cdkDrag
        cdkDragLockAxis="y"
        *ngFor="let lecture of lectures"
        [lecture]="lecture"
        [lectureTypes]="lectureTypes"
        [expanded]="lecture.id == (currentLecture?.id || null)"
        [courseErrors]="courseErrors"
        (selected)="onLectureSelected($event)"
        (updated)="onLectureUpdated($event)"
        (deleted)="onLectureDeleted($event)"
        (errorOccurred)="onErrorOccurred($event)"
        [deletionMessage]="deletionMessage"
      >
        <app-drag-icon slot="drag-handle" cdkDragHandle></app-drag-icon>
      </app-lectures-list-item>

      <app-lectures-list-item-new
        *ngIf="displayNewLectureForm"
        [lectureTypes]="lectureTypes"
        (created)="onLectureCreated($event)"
        (canceled)="toggleDisplayNewLectureForm()"
      >
      </app-lectures-list-item-new>

      <!-- New lecture -->
      <div fxLayout fxLayoutAlign="center">
        <button mat-mini-fab color="primary" *ngIf="!displayNewLectureForm && module" (click)="toggleDisplayNewLectureForm()"
                matTooltip="Add a new lecture">
          <mat-icon>add</mat-icon>
        </button>
      </div>

      <div fxLayout fxLayoutAlign="center" *ngIf="moduleCount == 0">
        Add a module to add new lectures
      </div>

    </div>
  `
})
export class LecturesListComponent implements OnInit {
  @Input() module: ModuleDto;
  @Input() lectures: LectureDto[] = [];
  @Input() lectureTypes: LectureType[] = [];
  @Input() currentLecture: LectureDto;
  @Input() deletionMessage: string;
  @Input() courseErrors: CourseErrorDto[] = [];
  @Input() moduleCount: number;

  @Output() lectureSelected = new EventEmitter<string>();
  @Output() lecturesOrdred = new EventEmitter<LectureDto[]>();
  @Output() lectureCreated = new EventEmitter<CreateLectureCommand>();
  @Output() lectureUpdated = new EventEmitter<UpdateLectureCommand>();
  @Output() lectureDeleted = new EventEmitter<LectureDto>();
  @Output() errorOccurred = new EventEmitter<any>();
  @Output() newLecture = new EventEmitter<void>();

  displayNewLectureForm = false;

  ngOnInit() {
    if (this.lectures.length > 0) {
      this.lectureSelected.emit(this.lectures[0].id);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lectures, event.previousIndex, event.currentIndex);

    this.lecturesOrdred.emit(this.lectures);
  }

  toggleDisplayNewLectureForm() {
    this.displayNewLectureForm = !this.displayNewLectureForm;
    if (this.displayNewLectureForm) {
      this.newLecture.emit();
    }
  }

  onLectureSelected(event: string) {
    this.lectureSelected.emit(event);
  }

  onLectureCreated(event: LectureDto) {
    this.lectureCreated.emit({
      ...event,
      moduleId: this.module.id,
      order: this.lectures.length + 1
    });
    this.toggleDisplayNewLectureForm();
  }

  onLectureUpdated(event: UpdateLectureCommand) {
    this.lectureUpdated.emit(event);
  }

  onLectureDeleted(event: LectureDto) {
    this.lectureDeleted.emit(event);
  }

  onErrorOccurred(event: any) {
    this.errorOccurred.emit(event);
  }
}
