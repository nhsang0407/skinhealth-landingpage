import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    // Tạo 15 cánh hoa với vị trí và timing ngẫu nhiên
    for (let i = 0; i < 15; i++) {
      this.petals.push({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4
      });
    }
  }

  scrollToContactForm() {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    this.http.post('http://localhost:3000/api/subscribe', this.formData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Chúng tôi sẽ liên hệ với bạn trong 24h!';
          this.resetForm();
        },
        error: (error) => {
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
