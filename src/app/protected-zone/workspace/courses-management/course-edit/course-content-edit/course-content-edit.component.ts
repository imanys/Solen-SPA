import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-course-content-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-content-edit.component.scss'],
  template: `
    <section>
      <mat-card>
        <div fxLayout="row" fxLayoutGap="10px" fxFlexAlign="center">
          <div fxFlex="40">
            <app-course-content-edit-modules></app-course-content-edit-modules>
          </div>
          <mat-divider [vertical]="true"></mat-divider>
          <div fxFlex="60">
            <app-course-lectures-edit></app-course-lectures-edit>
          </div>
        </div>
      </mat-card>
    </section>
  `
})
export class CourseContentEditComponent {

}
