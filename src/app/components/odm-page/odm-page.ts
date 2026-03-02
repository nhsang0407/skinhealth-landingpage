import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let gtag: Function;

interface CherryPetal {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-odm-page',
  templateUrl: './odm-page.html',
  styleUrls: ['./odm-page.css'],
  standalone: false
})
export class OdmPage implements OnInit {

  petals: CherryPetal[] = [];
  
  formData = {
    name: '',
    email: '',
    phone: '',
    businessType: '',
    agree: false
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    for (let i = 0; i < 15; i++) {
      this.petals.push({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4
      });
    }

    // Track page view riêng cho ODM page
    gtag('event', 'view_odm_page', {
      event_category: 'page_view',
      event_label: 'ODM Landing'
    });
  }

  scrollToContactForm() {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Track click CTA scroll
      gtag('event', 'click_odm_register_button', {
        event_category: 'cta_click',
        event_label: 'ODM Register Button'
      });
    }
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.formData.agree) {
      this.errorMessage = 'Vui lòng đồng ý nhận thông tin tư vấn để tiếp tục';
      return;
    }

    if (!this.formData.name || !this.formData.email) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc';
      return;
    }

    // Track submit attempt
    gtag('event', 'submit_odm_form', {
      event_category: 'form_submit',
      event_label: 'ODM Consultation Form'
    });

    this.http.post('http://localhost:3000/api/subscribe', this.formData)
      .subscribe({
        next: (response: any) => {

          // Track successful conversion
          gtag('event', 'odm_form_success', {
            event_category: 'conversion',
            event_label: 'ODM Lead Success'
          });

          this.successMessage = 'Chúng tôi sẽ liên hệ với bạn trong 24h!';
          this.resetForm();
        },
        error: (error) => {

          // Track error
          gtag('event', 'odm_form_error', {
            event_category: 'error',
            event_label: 'ODM Form Error'
          });

          this.errorMessage = 'Có lỗi xảy ra, vui lòng thử lại!';
        }
      });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      businessType: '',
      agree: false
    };
  }
}