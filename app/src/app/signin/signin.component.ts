import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  token: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}
  signIn() {
    if (this.username === '' || this.password === '') {
      Swal.fire({
        title: 'ตรวจสอบข้อมูล',
        text: 'โปรดกรอก Username หรือ Password',
        icon: 'warning',
      });
    } else {
      // Proceed with sign-in logic here

      const playload = {
        username: this.username,
        password: this.password,
      };

      try {
        this.http
          .post('https://localhost:3000/api/users/signin', playload)
          .subscribe((res: any) => {
            
          }),
          Swal.fire({
            title: 'ตรวจสอบข้อมูล',
            text: 'Invalid Username or Password!',
            icon: 'error',
          });
      } catch (err: any) {
        Swal.fire({
          title: 'Success!',
          text: 'You are logged in!',
          icon: 'success',
        });
      }
    }
  }
}
