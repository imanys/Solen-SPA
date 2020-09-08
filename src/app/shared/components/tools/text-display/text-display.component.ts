import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-text-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [innerHTML]="text | safeHtml"></div>
  `
})
export class TextDisplayComponent {
  @Input() text: string;
}
