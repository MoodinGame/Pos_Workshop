import { Component } from '@angular/core';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-size',
  standalone: true,
  imports: [MyModalComponent, RouterLink, FormsModule],
  templateUrl: './food-size.component.html',
  styleUrl: './food-size.component.css',
})
export class FoodSizeComponent {
  constructor(private http: HttpClient) {}

  foodTypes: any[] = [];
  foodSizes: any[] = [];
  id: number = 0;
  name: string = '';
  price: number = 0;
  remark: string = '';
  foodTypeId: number = 0;

  ngOnInit() {
    this.fetchDataFoodType();
    this.fetchData();
  }

  save() {
    const payload = {
      name: this.name,
      price: this.price,
      remark: this.remark,
      id: this.id,
      foodTypeId: parseInt(this.foodTypeId.toString()),
    };

    if (this.id > 0) {
      this.http
        .put(config.apiServer + '/api/foodSize/update', payload)
        .subscribe((res: any) => {
          this.fetchData();
        });
    } else {
      this.http
        .post(config.apiServer + '/api/foodSize/create', payload)
        .subscribe((res: any) => {
          this.fetchData();
          this.id = 0;
        });
    }

    document.getElementById('modalFoodSize_btnClose')?.click();
  }

  async remove(item: any) {
    try {
      const button = await Swal.fire({
        title: 'ลบข้อมูล',
        text: 'คุณต้องการลบข้อมูลใช่หรือไม่',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        this.http
          .delete(config.apiServer + '/api/foodSize/remove/' + item.id)
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


  fetchDataFoodType() {
    this.http
      .get(config.apiServer + '/api/foodType/list')
      .subscribe((res: any) => {
        this.foodTypes = res.results;
        this.foodTypeId = this.foodTypes[0].id;
      });
  }

  fetchData() {
    try {
      this.http
        .get(config.apiServer + '/api/foodSize/list')
        .subscribe((res: any) => {
          this.foodSizes = res.results;
        });
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      });
    }
  }


  edit(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.remark = item.remark;
    this.foodTypeId = item.foodTypeId;
    this.price = item.moneyAdded;
  }
}