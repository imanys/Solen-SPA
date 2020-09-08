import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import {CourseErrorDto, LectureDto, ModuleDto} from 'src/app/models';

@Component({
  selector: 'app-lectures-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['lectures-list.component.scss'],
  template: `
    <h4 class="subtitle">Lectures</h4>
    <div
      class="lectures__list"
      fxLayout="column"
      fxLayoutGap="8px"
      fxLayoutAlign="flex-start"
    >
      <app-lectures-list-item
        *ngFor="let lecture of lectures"
        [lecture]="lecture"
        [courseErrors]="courseErrors"
        [expanded]="false"
        (selected)="onLectureSelected($event)"
      >
      </app-lectures-list-item>
    </div>
    <div fxLayout fxLayoutAlign="center" *ngIf="lectures.length == 0">
      No lectures
    </div>
  `
})
export class LecturesListComponent {
  @Input() module: ModuleDto;
  @Input() lectures: LectureDto[] = [];
  @Input() currentLecture: LectureDto;
  @Input() courseErrors: CourseErrorDto[] = [];

  @Output() lectureSelected = new EventEmitter<string>();

  onLectureSelected(event: string) {
    this.lectureSelected.emit(event);
  }
}
