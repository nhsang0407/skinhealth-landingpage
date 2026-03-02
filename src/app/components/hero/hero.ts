import { Component } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  trackHeroCTA(action: string, label: string) {
    gtag('event', action, {
      event_category: 'hero_cta',
      event_label: label
    });
  }

}