import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import dayjs from 'dayjs';
import config from '../config';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-sum-per-month',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-sum-per-month.component.html',
  styleUrl: './report-sum-per-month.component.css'
})
export class ReportSumPerMonthComponent {
  constructor(private http: HttpClient) {

  }


  ddlYear: number[] = [];
  data: any[] = [];
  year: number = dayjs().year();
  


  ngOnInit() {
    this.ddlYear = Array.from({ length : 10 }, (_,i) => this.year - i);
    this.fetchData();
  }

  fetchData() {
    try {
      const payload = {
        year: this.year
      }
        
      //  Middleware
      const token = localStorage.getItem('angular_token')!;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post(config.apiServer + '/api/report/sumPerMonthInYear', payload, { headers: headers })
        .subscribe((res: any) => {
          this.data = res.results;
        })
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }
}
