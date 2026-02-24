import { Component, OnInit } from '@angular/core';

interface CherryPetal {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  petals: CherryPetal[] = [];

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
}
