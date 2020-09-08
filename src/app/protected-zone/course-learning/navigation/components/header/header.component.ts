import {
  Component,
  Input,
} from '@angular/core';


@Component({
  selector: 'app-course-progress-header',
  styleUrls: ['header.component.scss'],
  template: `
    <mat-toolbar color="primary">

      <mat-toolbar-row class="mat-toolbar-row-top">
        <div fxFlex fxLayout fxLayoutAlign="start center" fxLayoutGap="10px">
          <div>
            <a routerLink="/workspace/dashboard"><img src="assets/images/solen-logo-transparent.png" width="70" height="70"> </a>
          </div>
          <div>
            <a [routerLink]="linkToCourse">
              {{courseTitle}}
            </a>
          </div>
          <div fxFlex fxLayout fxLayoutAlign="end">
            <circle-progress [percent]="progress"></circle-progress>
          </div>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  @Input() courseId: string;
  @Input() courseTitle: string;
  @Input() courseDuration: number;
  @Input() completedDuration: number;

  get linkToCourse() {
    return `/workspace/my-courses/course/${this.courseId}/overview`;
  }

  get progress() {
    if (this.courseDuration === 0) {
      return 0;
    }
    return ((this.completedDuration / this.courseDuration) * 100).toFixed();
  }
}
