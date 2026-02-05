import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-odm-page',
  templateUrl: './odm-page.html',
  styleUrls: ['./odm-page.css'],
  standalone: false
})
export class OdmPage {
  formData = {
    name: '',
    phone: '',
    product: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.phone) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

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
      phone: '',
      product: ''
    };
  }
}
