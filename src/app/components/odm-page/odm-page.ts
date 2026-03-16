import { Component, OnInit } from '@angular/core';

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
  private readonly hubspotEndpoint = 'https://api.hsforms.com/submissions/v3/integration/submit/244815510/a441952d-477d-45fe-b0c8-7187d95f135d';
  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  private readonly businessTypeMap: Record<string, string> = {
    spa: 'Spa / Thẩm mỹ viện',
    clinic: 'Phòng khám da liễu',
    retail: 'Cửa hàng bán lẻ',
    brand: 'Thương hiệu mỹ phẩm',
    company: 'Thương hiệu mỹ phẩm',
    other: 'Khác'
  };

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

  constructor() {}

  private isValidEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  private isValidHutk(hutk: string): boolean {
    return /^[a-z0-9-]{16,}$/i.test(hutk);
  }

  private getCookie(cookieName: string): string {
    const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : '';
  }

  private trackEvent(eventName: string, params: Record<string, string>) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  ngOnInit() {
    for (let i = 0; i < 15; i++) {
      this.petals.push({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4
      });
    }

    this.trackEvent('view_odm_page', {
      event_category: 'page_view',
      event_label: 'ODM Landing'
    });
  }

  scrollToContactForm() {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      this.trackEvent('click_odm_register_button', {
        event_category: 'cta_click',
        event_label: 'ODM Register Button'
      });
    }
  }

  async onSubmit() {
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

    const normalizedEmail = this.formData.email.trim().toLowerCase();

    if (!this.isValidEmail(normalizedEmail)) {
      this.errorMessage = 'Email không hợp lệ. Vui lòng kiểm tra lại!';
      return;
    }

    const hutk = this.getCookie('hubspotutk');
    const context: { pageUri: string; pageName: string; hutk?: string } = {
      pageUri: window.location.href,
      pageName: document.title
    };

    if (this.isValidHutk(hutk)) {
      context.hutk = hutk;
    }

    this.trackEvent('submit_odm_form', {
      event_category: 'form_submit',
      event_label: 'ODM Consultation Form'
    });

    const payload = {
      fields: [
        { name: 'firstname', value: this.formData.name.trim() },
        { name: 'email', value: normalizedEmail },
        { name: 'phone', value: this.formData.phone.trim() },
        { name: 'business_type', value: this.businessTypeMap[this.formData.businessType] || this.formData.businessType }
      ],
      context
    };

    try {
      const response = await fetch(this.hubspotEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('HubSpot submit failed');
      }

      this.trackEvent('odm_form_success', {
        event_category: 'conversion',
        event_label: 'ODM Lead Success'
      });

      this.successMessage = 'Đăng ký thành công';
      this.resetForm();
    } catch {
      this.trackEvent('odm_form_error', {
        event_category: 'error',
        event_label: 'ODM Form Error'
      });

      this.errorMessage = 'Có lỗi xảy ra, vui lòng thử lại!';
    }
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