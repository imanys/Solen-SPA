import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-templates-list-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-templates-list-container></app-templates-list-container>
  `
})
export class TemplatesListComponent {

}
