import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.html',
  styleUrls: ['./newsletter.css'],
  standalone: false
})
export class Newsletter {
  formData = {
    name: '',
    email: '',
    phone: '',
    business: '',
    agree: false
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.formData.agree) {
      this.errorMessage = 'Vui lòng đồng ý nhận thông tin từ SkinHealth';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/subscribe', this.formData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response.message || 'Đăng ký thành công!';
          this.resetForm();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
        }
      });
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
