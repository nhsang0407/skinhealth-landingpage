import { Component } from '@angular/core';

declare var gtag: Function;

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.html',
  styleUrls: ['./newsletter.css'],
  standalone: false
})
export class Newsletter {
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

  formData = {
    name: '',
    email: '',
    phone: '',
    business: '',
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

  async onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.formData.agree) {
      this.errorMessage = 'Vui lòng đồng ý nhận thông tin từ SkinHealth';
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

    const payload = {
      fields: [
        { name: 'firstname', value: this.formData.name.trim() },
        { name: 'email', value: normalizedEmail },
        { name: 'phone', value: this.formData.phone.trim() },
        { name: 'business_type', value: this.businessTypeMap[this.formData.business] || this.formData.business }
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

      this.successMessage = 'Đăng ký thành công';

      if (typeof gtag === 'function') {
        gtag('event', 'newsletter_submit', {
          event_category: 'engagement',
          event_label: 'newsletter_form'
        });
      }

      this.resetForm();
    } catch {
      this.errorMessage = 'Có lỗi xảy ra, vui lòng thử lại!';
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      business: '',
      agree: false
    };
  }
}
