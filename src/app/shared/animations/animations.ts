import {
  trigger, transition, state, style, animate
} from '@angular/animations';

export enum States {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut',
}

const hasAttribute = (attribute: string) => (
  fromState: string,
  toState: string,
  element: any,
  params: { [key: string]: any }
): boolean => element.hasAttribute(attribute) || (params && params.type === attribute);

export const fade = trigger('fade', [
  state(States.FadeIn, style({opacity: 0.1, display: 'none'})),
  state(States.FadeOut, style({opacity: 1, display: 'block'})),
  transition(hasAttribute('fast'), animate('200ms linear')),
  transition(`${States.FadeIn} <=> ${States.FadeOut}`, animate('400ms linear')),
]);
