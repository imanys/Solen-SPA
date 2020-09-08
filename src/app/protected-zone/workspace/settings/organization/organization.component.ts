import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-organization-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <app-organization-info-container></app-organization-info-container>
    </section>
  `
})
export class OrganizationComponent {

}
