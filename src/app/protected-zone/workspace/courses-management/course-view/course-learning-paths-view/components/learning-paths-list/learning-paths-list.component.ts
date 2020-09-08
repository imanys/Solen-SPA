import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {CourseLearningPathDto} from 'src/app/models';

@Component({
  selector: 'app-course-learning-paths-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-paths-list.component.scss'],
  template: `
    <mat-selection-list [disabled]="true">
      <mat-list-option
        *ngFor="let path of learningPaths"
        [selected]="isSelected(path.id)"
      >
        {{ path.name }}
      </mat-list-option>
      <p>
        Learning Paths selected: <strong>{{ selectedPath }}</strong>
      </p>
    </mat-selection-list>
  `
})
export class LearningPathsListComponent {
  @Input() learningPaths: CourseLearningPathDto[] = [];
  @Input() selectedLearningPaths: CourseLearningPathDto[] = [];

  isSelected(learningPathId: string): boolean {
    return this.selectedLearningPaths.map(x => x.id).includes(learningPathId);
  }

  get selectedPath() {
    if (this.selectedLearningPaths.length > 0) {
      return this.selectedLearningPaths.map(x => x.name).join(', ');
    }

    return 'None';
  }
}
