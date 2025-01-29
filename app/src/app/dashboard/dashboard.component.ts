import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import config from '../config';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private http: HttpClient) {}

  incomePerDays: any[] = [];
  incomePerMonths: any[] = [];
  years: number[] = [];
  monthNames: string[] = [];
  days: number[] = [];
  dayjs: typeof dayjs = dayjs;
  month: number = dayjs().month();
  year: number = dayjs().year();


    ngOnInit() {
      const totalDayInmonth = dayjs().daysInMonth();
      this.days = Array.from({ length: totalDayInmonth }, (_, i) => i + 1);
      this.years = Array.from({ length : 10}, (_, i)=> dayjs().year() - i);
      this.monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
      
    }

    fetchData() {
      this.fetchDataSomePerDayInYearAndMonth();
      this.fetchDataSomePerMonthInYear();
    }

    createBarChartDays() {
      let labels : number[] = [];
      let datas : number[] = [];

     for (let i = 0 ; i < this.incomePerDays.length ; i++) {
      const item = this.incomePerDays[i];
      labels.push(i + 1);
      datas.push(item.amount);
     }
      
     const ctx = document.getElementById('chartPerDay') as HTMLCanvasElement;
     new Chart(ctx, {
        type : 'bar',
        data: {
          labels: labels,
          datasets: [{
              label: 'รายได้ตามวัน',
              data: datas,
              backgroundColor: 'rgb(54, 162, 235)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1,
              borderRadius: 10 // Add this line to set the border radius
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
     });

    }

    fetchDataSomePerDayInYearAndMonth() {
      try {
        
        const playload = {
          year: this.year,
          month: this.month
        };

        this.http.post(config.apiServer + '/api/report/somePerDayInYearAndMonth', playload )
        .subscribe((res : any) =>{
          this.incomePerDays = res.results;
          this.createBarChartDays();
        })



      } catch (e : any) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: e.message
        })
      }

    }
     
    createBarChartMonths(){
      let datas : number[] = [];

      for(let i =0 ; i < this.incomePerMonths.length ; i++) {
        const item = this.incomePerMonths[i];
        datas.push(item.amount);
      }

      const ctx = document.getElementById('chartPerMonth') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.monthNames,
          datasets: [{
            label: 'รายได้ตามเดือน',
            data: datas,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            borderRadius: 10
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });


    }




    fetchDataSomePerMonthInYear() {

    }

}
