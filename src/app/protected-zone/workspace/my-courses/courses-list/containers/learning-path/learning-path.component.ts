import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../shared/store';
import * as fromAuth from '../../../../../../auth/store';

import {LoggedUserDto} from 'src/app/models/models';


@Component({
  selector: 'app-learning-path',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-path.component.scss'],
  template: `
    <div>
      Your learning path : <strong>{{(loggedUser$ | async).learningPath}} </strong>
    </div>
  `
})
export class LearningPathComponent implements OnInit {
  loggedUser$: Observable<LoggedUserDto>;

  constructor(private store: Store<fromStore.LearningState>) {}

  ngOnInit() {
    this.loggedUser$ = this.store.select(fromAuth.getLoggedUser);
  }
}
