import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  name: string = '';

  ngOnInit() {
    if (this.isBrowser()) {
      this.name = localStorage.getItem('angular_name')!;
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  async signout() {
    const button = await Swal.fire({
      title: 'ยืนยันการออกจากระบบ',
      text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    });

    if (button.isConfirmed) {
      localStorage.removeItem('angular_token');
      localStorage.removeItem('angular_name');
      location.reload();
    }
  }

}
