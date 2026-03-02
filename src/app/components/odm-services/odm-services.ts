import { Component } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-odm-services',
  standalone: false,
  templateUrl: './odm-services.html',
  styleUrl: './odm-services.css',
})
export class OdmServices {

  trackOdmServiceClick() {
    gtag('event', 'click_odm_services_section', {
      event_category: 'cta_click',
      event_label: 'ODM Services Section Button'
    });
  }

}