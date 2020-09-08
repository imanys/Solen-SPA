import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromStore from '../shared/store';
import * as fromRouter from 'src/app/app-routing/store';

import {LearningPathDto} from '../../../../models';


@Component({
  selector: 'app-learning-path-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path-detail.component.scss'],
  template: `
    <section>
      <app-go-back-button (clicked)="onGoBackClick()"></app-go-back-button>
      <div class="card">
        <div class="title">{{learningPath?.name}}</div>
      </div>
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

      <div>
        <router-outlet></router-outlet>
      </div>
    </section>
  `
})
export class LearningPathDetailComponent implements OnInit, OnDestroy {
  learningPath: LearningPathDto;
  pathSubscription: Subscription;
  navLinks: any[];

  constructor(private store: Store<fromStore.LearningPathsState>) {
    this.navLinks = [
      {
        label: 'Info',
        path: 'info'
      },
      {
        label: 'Courses',
        path: 'courses'
      },
      {
        label: 'Learners',
        path: 'learners'
      }
    ];
  }

  ngOnInit() {
    this.pathSubscription = this.store.select(fromStore.getSelectedLearningPath)
      .subscribe(learningPath => {
        this.learningPath = learningPath;
      });
  }

  ngOnDestroy() {
    if (this.pathSubscription) {
      this.pathSubscription.unsubscribe();
    }
  }

  onGoBackClick() {
    this.store.dispatch(
      fromRouter.go({path: ['/workspace/learning-paths']})
    );
  }

}
