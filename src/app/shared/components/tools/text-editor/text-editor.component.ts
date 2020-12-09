import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-text-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <angular-editor
        [formControlName]="controlName"
        [placeholder]="placeholder"
        [config]="editorConfig"
      ></angular-editor>
    </div>
  `
})
export class TextEditorComponent {
  @Input() parent: FormGroup;
  @Input() controlName: string;
  @Input() placeholder = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: this.placeholder,
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial'
  };
}
