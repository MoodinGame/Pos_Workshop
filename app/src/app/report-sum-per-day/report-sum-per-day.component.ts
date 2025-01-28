import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import config from '../config';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

@Component({
  selector: 'app-report-sum-per-day',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-sum-per-day.component.html',
  styleUrl: './report-sum-per-day.component.css',
})
export class ReportSumPerDayComponent {
  constructor(private http: HttpClient) {}

  ddlYear: number[] = [];
  ddlMonth: string[] = [];
  data: any[] = [];
  year: number = dayjs().year();
  month: number = dayjs().month() + 1;
  dayjs: typeof dayjs = dayjs;

  ngOnInit() {
    this.ddlYear = this.getYear();
    this.ddlMonth = this.getMonth();


  }

  getYear() {
    const currentYear = dayjs().year();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }

  getMonth(){
    const thaiMonths = [  'มกราคม', 'กุมภาพันธ์', 'มีนาคม',  'เมษายน', 'พฤษภาคม',  'มิถุนายน',  'กรกฎาคม', 'สิงหาคม', 'กันยายน',  'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    return thaiMonths
  }

  fetchData() {
    const playload = {
      year: this.year,
      month: this.month,
    }

    this.http.post(config.apiServer + '/api/report/sumPerDayInYearAndMonth', playload)
    .subscribe((res: any) => {
      this.data = res.results;
    })
  }
}
