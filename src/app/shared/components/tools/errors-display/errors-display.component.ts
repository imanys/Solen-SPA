import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-errors-display',
  styleUrls: ['errors-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <ul>
        <li *ngFor="let error of errors">
          {{error}}
        </li>
      </ul>
    </div>
  `
})
export class ErrorsDisplayComponent {
  @Input() errors: string[];
}
