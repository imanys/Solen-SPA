import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LearnerLectureDto } from 'src/app/models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-current-lecture',
  styleUrls: ['current-lecture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lecture [lecture]="currentLecture$ | async"> </app-lecture>
  `
})
export class CurrentLectureComponent implements OnInit {
  currentLecture$: Observable<LearnerLectureDto>;

  constructor(private store: Store<fromStore.LearningState>) {}

  ngOnInit() {
    this.currentLecture$ = this.store.select(fromStore.getSelectedLecture);
  }
}
