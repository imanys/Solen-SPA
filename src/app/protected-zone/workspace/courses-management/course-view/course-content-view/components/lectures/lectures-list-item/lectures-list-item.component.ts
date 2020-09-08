import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {CourseErrorDto, LectureDto, LectureType} from 'src/app/models';

@Component({
  selector: 'app-lectures-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures-list-item.component.scss'],
  template: `
    <a (click)="onSelect()">
      <app-expansion-panel [expanded]="expanded" (opened)="expanded = true" (closed)="expanded = false"
                           [errors]="lectureErrors.length > 0">
        <span slot="title">{{ title }}</span>
        <div slot="header-right-side-content">
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
              <input matInput placeholder="Title" formControlName="title"/>
            </mat-form-field>
            <!-- lecture content-->
            <app-lecture-content
              [parent]="form"
              [lecture]="lecture"
              [current]="expanded"
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
  form = this.fb.group({
    title: '',
    lectureType: '',
    content: null
  });

  @Input() lecture: LectureDto;
  @Input() lectureTypes: LectureType[] = [];
  @Input() expanded: boolean;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() selected = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.lecture && this.lecture.id) {
      this.form.patchValue(this.lecture);

      this.form.disable();
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
}
