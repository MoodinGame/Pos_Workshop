import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import Swal from 'sweetalert2';
import { MyModalComponent } from '../my-modal/my-modal.component';
@Component({
  selector: 'app-food-type',
  standalone: true,
  imports: [FormsModule, MyModalComponent],
  templateUrl: './food-type.component.html',
  styleUrl: './food-type.component.css'
})
export class FoodTypeComponent implements OnInit {
  name: string = '';
  remark: string = '';
  foodTypes: any = [];
  id: number = 0;

  constructor(private http: HttpClient) {

   
   }

   clearForm(){

    this.name = '';
    this.remark = '';
    this.id = 0;  
  }

  save() {
    try {
      const payload = {
        name: this.name,
        remark: this.remark,
        id: 0,
      };

      if (this.id > 0) {

        payload.id = this.id;

        this.http
          .put(config.apiServer + '/api/foodType/update', payload)
          .subscribe((res: any) => {
            this.fetchData();
            this.id = 0;
          });

      } else {

        this.http.post(config.apiServer + '/api/FoodType/create', payload)
          .subscribe((res) => {
            console.log(res);
            this.fetchData();
          })

      }

    document.getElementById('modalFoodType_btnClose')?.click();

    } catch (e: any) {
      Swal.fire({
        title: 'Error!',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'error',
      })
    }
  }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get(config.apiServer + '/api/foodType/list')
      .subscribe((res: any) => {
        this.foodTypes = res.results;
      });
  }

  async remove(item: any) {
    try {
      const button = await Swal.fire({
        title: 'ลบรายการ',
        text: 'คุณต้องการลบรายการใช่หรือไม่',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        this.http
          .delete(config.apiServer + '/api/foodType/remove/' + item.id)
          .subscribe((res: any) => {
            this.fetchData();
          });
      }
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      });
    }
  }

  edit(item: any) {
    this.name = item.name;
    this.remark = item.remark;
    this.id = item.id;
  }

}


