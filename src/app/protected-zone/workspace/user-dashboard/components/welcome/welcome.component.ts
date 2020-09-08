import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-welecome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h1>Welcome!</h1>
    </section>
  `
})
export class WelcomeComponent {}
