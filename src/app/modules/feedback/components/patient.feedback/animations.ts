// src/app/animations.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('400ms ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ transform: 'translateX(-100%)' }))
  ])
]);