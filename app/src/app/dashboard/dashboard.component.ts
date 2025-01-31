import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import config from '../config';
import dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http: HttpClient) {}

  incomePerDays: any[] = [];
  incomePerMonths: any[] = [];
  years: number[] = [];
  monthNames: string[] = [];
  days: number[] = [];
  dayjs: typeof dayjs = dayjs;
  year: number = dayjs().year();
  month: number = dayjs().month() + 1;

  ngOnInit() {
    const totalDayInMonth = dayjs().daysInMonth();

    this.days = Array.from({length: totalDayInMonth}, (_, i) => i + 1);
    this.years = Array.from({length: 10}, (_, i) => dayjs().year() - i);
    this.monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    this.fetchData();
  }

  fetchData() {
    this.fetchDataSumPerDayInYearAndMonth();
    this.fetchDataSumPerMonthInYear();
  }

  createBarChartDays() {
    let labels: number[] = [];
    let datas: number[] = [];

    for (let i = 0; i < this.incomePerDays.length; i++) {
      const item = this.incomePerDays[i];
      labels.push(i + 1);
      datas.push(item.amount);
    }

    const ctx = document.getElementById('chartPerDay') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'รายรับรวมตามวัน (บาท)',
          data: datas,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  fetchDataSumPerDayInYearAndMonth() {
    try {
      const payload = {
        year: this.year,
        month: this.month
      }

      this.http.post(config.apiServer + '/api/report/sumPerDayInYearAndMonth', payload)
      .subscribe((res: any) => {
        this.incomePerDays = res.results;
        this.createBarChartDays();
      })
    } catch (e: any) {
      Swal.fire({ 
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  createBarChartMonths() {
    let datas: number[] = [];

    for (let i = 0 ;i < this.incomePerMonths.length; i++) {
      const item = this.incomePerMonths[i];
      datas.push(item.amount);
    }

    const ctx = document.getElementById('chartPerMonth') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.monthNames,
        datasets: [{
          label: 'รายรับรวมตามเดือน (บาท)',
          data: datas,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  fetchDataSumPerMonthInYear() {
    try {
      const payload = {
        year: this.year
      }

      this.http.post(config.apiServer + '/api/report/sumPerMonthInYear', payload)
      .subscribe((res: any) => {
        this.incomePerMonths = res.results;
        this.createBarChartMonths();
      })
    } catch (e: any) {
      Swal.fire({
        icon: 'error',
        text: e.message,
        title: 'error'
      })
    }
  }
}