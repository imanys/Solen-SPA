import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../../shared/store';
import * as fromRouter from 'src/app/app-routing/store';

@Component({
  selector: 'app-course-edit',
  styleUrls: ['course-info-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <app-go-back-button (clicked)="onGoBackClick()"> </app-go-back-button>
      <app-course-info-edit></app-course-info-edit>

      <nav mat-tab-nav-bar>
        <a
          mat-tab-link
          *ngFor="let link of navLinks"
          [routerLink]="link.path"
          routerLinkActive
          #rla="routerLinkActive"
          [active]="rla.isActive"
        >
          {{ link.label }}
        </a>
      </nav>

      <router-outlet></router-outlet>
    </section>
  `
})
export class CourseInfoEditComponent {
  navLinks: any[];
  activeLinkIndex = 0;
  constructor(private store: Store<fromStore.CourseManagementState>) {
    this.navLinks = [
      {
        label: 'General',
        path: 'general',
        index: 1
      },
      {
        label: 'Content',
        path: 'content',
        index: 2
      },
      {
        label: 'Learning Paths',
        path: 'learning-paths',
        index: 3
      },
      {
        label: 'Errors',
        path: 'errors',
        index: 4
      },
      {
        label: 'Preview',
        path: 'preview',
        index: 5
      },
    ];
  }

  onGoBackClick() {
    this.store.dispatch(
      fromRouter.go({ path: ['/workspace/courses-management/courses'] })
    );
  }
}
