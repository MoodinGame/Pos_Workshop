import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterLink , Router } from '@angular/router';
import config from '../config';
import { HttpClient  , HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private http: HttpClient , private router: Router) { }
  name: string = '';
  level: string = '';

  ngOnInit() {
    if (this.isBrowser()) {
      this.name = localStorage.getItem('angular_name')!;
      this.getlevelFromToken();
    }
  }
  
  getlevelFromToken() {
    const token = localStorage.getItem('angular_token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` );

    this.http.get(config.apiServer + '/api/user/getLevelFromToken', {headers : headers})
      .subscribe((res: any) => {
        this.level = res.level
  });
}

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  
  async signout() {
    const button = await Swal.fire({
      title: 'ออกจากระบบ',
      text: 'คุณต้องการออกจากระบบ ใช่หรือไม่',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (button.isConfirmed) {
      localStorage.removeItem('angular_token');
      localStorage.removeItem('angular_name');

    

      // navigate to login page
      this.router.navigate(['/']);


      //location.reload();
    }
  }

}
