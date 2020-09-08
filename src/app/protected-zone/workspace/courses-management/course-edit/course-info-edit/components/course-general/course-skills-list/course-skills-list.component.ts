import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  CourseLearnedSkillDto,
  CourseDto,
  UpdateCourseCommand
} from 'src/app/models';

@Component({
  selector: 'app-course-skills-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-skills-list.component.scss'],
  template: `
    <mat-card>
      <mat-card-subtitle
        >The skills learned at the end of the course :</mat-card-subtitle
      >
      <mat-card-content
        fxLayout="column"
        fxLayoutGap="10px"
        fxLayoutAlign="center center"
      >
        <mat-list>
          <mat-list-item *ngFor="let skill of skills; let i = index">
            <mat-icon mat-list-icon>check</mat-icon>
            <h4 mat-line>{{ skill.name }}</h4>
            <button type="button" mat-icon-button>
              <mat-icon (click)="removeSkill(i)">delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
        <mat-form-field>
          <input
            matInput
            placeholder="New skill"
            [(ngModel)]="skillValue"
            [maxlength]="skillMaxlength"
            (keydown.enter)="addSkill($event)"
          />
          <mat-hint align="end">
            {{ skillValue?.length || 0 }}/
            {{ skillMaxlength }}
          </mat-hint>
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `
})
export class CourseSkillsListComponent implements OnInit {
  @Input() course: CourseDto;
  skills: CourseLearnedSkillDto[];

  @Output() updated = new EventEmitter<UpdateCourseCommand>();

  skillValue: string;
  skillMaxlength = '150';

  ngOnInit() {
    this.skills = this.course.courseLearnedSkills;
  }

  update() {
    this.updated.emit({
      ...this.course,
      courseId: this.course.id,
      courseLearnedSkills: this.skills.map(s => s.name)
    });
  }

  addSkill(event) {
    if (this.skillValue.length === 0) {
      return;
    }

    this.skills = [...this.skills, { name: this.skillValue, id: 0 }];

    this.update();

    this.skillValue = '';
  }

  removeSkill(index: number) {
    this.skills = this.skills.filter((_, i) => i !== index);

    this.update();
  }
}
