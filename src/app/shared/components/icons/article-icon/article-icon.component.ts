import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-icon',
  template: `
    <mat-icon inline="true" [ngClass]="{ 'app-icon': true, 'pb-1': padding }"
      >text_format</mat-icon
    >
  `
})
export class ArticleIconComponent {
  @Input() padding = true;
}
