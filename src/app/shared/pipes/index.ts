import { HoursMinuteSecondsPipe } from './hours-minute-seconds.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ShortenPipe } from './shorten.pipe';
import { StripTagsPipe } from './strip-tags.pipe';

export const pipes: any[] = [
  HoursMinuteSecondsPipe,
  SafeHtmlPipe,
  ShortenPipe,
  StripTagsPipe
];

export * from './hours-minute-seconds.pipe';
export * from './safe-html.pipe';
export * from './shorten.pipe';
export * from './strip-tags.pipe';
