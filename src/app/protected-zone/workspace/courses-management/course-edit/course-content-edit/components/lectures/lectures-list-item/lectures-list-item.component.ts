import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {debounceTime} from 'rxjs/operators';
import {StripTagsPipe} from 'src/app/shared/pipes/strip-tags.pipe';

import {CourseErrorDto, LectureDto, LectureType, UpdateLectureCommand} from 'src/app/models';
import {ConfirmationDialogComponent} from 'src/app/shared/components';


@Component({
  selector: 'app-lectures-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures-list-item.component.scss'],
  template: `
    <a (click)="onSelect()">
      <app-expansion-panel [expanded]="expanded" [errors]="lectureErrors.length > 0">
        <span slot="title">{{ title }}</span>
        <i slot="drag-handle">
          <ng-content select="[slot=drag-handle]"></ng-content>
        </i>
        <div slot="header-right-side-content">
          <app-delete-icon (clicked)="openDeleteDialog()" tooltip="delete lecture"></app-delete-icon>
          <app-lecture-header [lecture]="lecture"></app-lecture-header>
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
                placeholder="Title"
                formControlName="title"
                [maxlength]="titleMaxlength"
                required
              />
              <mat-hint align="end">
                {{ form.get("title").value?.length || 0 }}/
                {{ titleMaxlength }}
              </mat-hint>
              <mat-error *ngIf="form.get('title').hasError('required')">
                The title is required
              </mat-error>
            </mat-form-field>
            <!-- lecture content-->
            <app-lecture-content
              [parent]="form"
              [lecture]="lecture"
              [current]="expanded"
              (videoUploaded)="videoUploaded($event)"
              (errorOccurred)="onErrorOccurred($event)"
            >
            </app-lecture-content>
          </form>
          <app-errors-display [errors]="lectureErrors"></app-errors-display>
        </div>
      </app-expansion-panel>
    </a>
  `
})
export class LecturesListItemComponent implements OnInit {
  titleMaxlength = 100;

  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.titleMaxlength)]
    ],
    lectureType: ['', Validators.required],
    content: null
  });

  @Input() lecture: LectureDto;
  @Input() lectureTypes: LectureType[] = [];
  @Input() expanded: boolean;
  @Input() deletionMessage: string;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() selected = new EventEmitter<string>();
  @Output() updated = new EventEmitter<UpdateLectureCommand>();
  @Output() deleted = new EventEmitter<LectureDto>();
  @Output() errorOccurred = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private stripTags: StripTagsPipe
  ) {
  }

  ngOnInit() {
    if (this.lecture && this.lecture.id) {
      this.form.patchValue(this.lecture);

      this.form.valueChanges
        .pipe(debounceTime(1500))
        .subscribe(() => this.update());
    }
  }

  get title(): string {
    return `${this.lecture.order}.${this.lecture.title}`;
  }

  get lectureErrors() {
    return this.courseErrors.filter(x => x.lectureId === this.lecture?.id).map(x => x.error);
  }

  onSelect() {
    this.selected.emit(this.lecture.id);
  }

  update() {
    const {value, valid} = this.form;
    if (valid) {
      const duration =
        value.content === null
          ? this.lecture.duration
          : this.readingTime(value.content);

      this.updated.emit({
        lectureId: this.lecture.id,
        duration,
        ...value
      });
    }
  }

  videoUploaded(duration: number) {
    const {value} = this.form;

    this.updated.emit({duration, lectureId: this.lecture.id, ...value});
  }

  onErrorOccurred(event: any) {
    this.errorOccurred.emit(event);
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.deletionMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.lecture);
      }
    });
  }

  readingTime(text: string): number {
    text = this.stripTags.transform(text);
    const wordsPerMinute = 200;
    const noOfWords = text ? text.split(/\s/g).length : 0;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes) * 60;
  }
}
