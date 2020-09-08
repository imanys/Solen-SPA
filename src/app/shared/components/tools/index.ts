import {TextEditorComponent} from './text-editor/text-editor.component';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {TextDisplayComponent} from './text-display/text-display.component';
import {ErrorsDisplayComponent} from './errors-display/errors-display.component';

export const tools: any[] = [
  TextEditorComponent,
  VideoPlayerComponent,
  TextDisplayComponent,
  ErrorsDisplayComponent
];

export * from './text-editor/text-editor.component';
export * from './video-player/video-player.component';
export * from './text-display/text-display.component';
export *  from './errors-display/errors-display.component';
