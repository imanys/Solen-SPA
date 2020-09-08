import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-content-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-content-view.component.scss'],
  template: `
    <section>
      <mat-card>
        <div fxLayout="row" fxLayoutGap="10px">
          <div fxFlex="40">
            <app-course-content-view-modules> </app-course-content-view-modules>
          </div>
          <mat-divider [vertical]="true"></mat-divider>
          <div fxFlex="60">
            <app-course-lectures-view></app-course-lectures-view>
          </div>
        </div>
      </mat-card>
    </section>
  `
})
export class CourseContentViewComponent {}
