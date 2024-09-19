import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import config from '../config';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  token: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.isBrowser()) {
      // Your logic to access localStorage
      this.token = localStorage.getItem('angular_token')!;
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  signIn() {
    if (this.username == '' || this.password == '') {
      Swal.fire({
        title: 'ตรวจสอบข้อมูล',
        text: 'โปรดกรอก username หรือ password ด้วย',
        icon: 'error',
      });
    } else {
      const payload = {
        username: this.username,
        password: this.password,
      };

      try {
        this.http
          .post('http://localhost:3000/api/user/signin', payload)
          .subscribe(
            (res: any) => {
              this.token = res.token;
              localStorage.setItem('angular_token', this.token);
              localStorage.setItem('angular_name', res.name);
              localStorage.setItem('angular_id', res.id);
              location.reload();
            },
            (err: any) => {
              Swal.fire({
                title: 'ตรวจสอบข้อมูล',
                text: 'username invalid',
                icon: 'error',
              });
            }
          );
      } catch (e: any) {
        Swal.fire({
          title: 'error',
          text: e.message,
          icon: 'error',
        });
      }
    }
  }
}