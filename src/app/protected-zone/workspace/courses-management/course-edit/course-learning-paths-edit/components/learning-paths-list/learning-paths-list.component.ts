import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { MatListOption } from '@angular/material/list';

import {
  CourseDto,
  CourseLearningPathDto,
  UpdateCourseLearningPathsCommand
} from 'src/app/models';

@Component({
  selector: 'app-course-learning-paths-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-paths-list.component.scss'],
  template: `
    <mat-selection-list
      #groupsList
      (selectionChange)="onSelectionChange(groupsList.selectedOptions.selected)"
    >
      <mat-list-option
        *ngFor="let learningPath of learningPaths"
        [value]="learningPath.id"
        [selected]="isSelected(learningPath.id)"
      >
        {{ learningPath.name }}
      </mat-list-option>
      <p>
        Learning Paths selected: <strong>{{ selectedLearningPaths }}</strong>
      </p>
    </mat-selection-list>
  `
})
export class LearningPathsListComponent {
  @Input() course: CourseDto;
  @Input() learningPaths: CourseLearningPathDto[] = [];
  @Input() selectedPaths: CourseLearningPathDto[] = [];

  @Output() courseLearningPathsUpdated = new EventEmitter<UpdateCourseLearningPathsCommand>();

  isSelected(learningPathId: string): boolean {
    return this.selectedPaths.map(g => g.id).includes(learningPathId);
  }

  get selectedLearningPaths() {
    if (this.selectedPaths.length > 0) {
      return this.selectedPaths.map(x => x.name).join(', ');
    }

    return 'None';
  }

  onSelectionChange(options: MatListOption[]) {
    const learningPathsIds = options.map(o => o.value);

    this.courseLearningPathsUpdated.emit({courseId: this.course.id, learningPathsIds});
  }
}
