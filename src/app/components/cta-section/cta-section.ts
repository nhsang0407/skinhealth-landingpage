import { Component } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-cta-section',
  standalone: false,
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection {

  trackCTA(action: string, label: string) {
    gtag('event', action, {
      event_category: 'cta_click',
      event_label: label
    });
  }

}