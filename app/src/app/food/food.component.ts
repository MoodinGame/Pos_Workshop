import { Component, OnInit } from '@angular/core';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [MyModalComponent, FormsModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit {


  constructor(private http: HttpClient) { }

  foodTypes: any[] = [];
  foods: any[] = [];
  name: string = '';
  fileName: string = '';
  price: number = 0;
  remark: string = '';
  foodType: string = 'food ';
  id: number = 0;
  foodTypeId: number = 0;
  file: File | undefined = undefined ;
  serverPath: string = '';
  img: string = '';

  ngOnInit() {
    this.fetchDataFoodType();
    this.fetchData()
    this.serverPath = config.apiServer;
  }

 async fetchData() {
   this.http.get(config.apiServer + '/api/food/list').subscribe((res : any) => {
    this.foods = res.results;
   })
    
  }

 async fetchDataFoodType() {
    try {
      this.http
        .get(config.apiServer + '/api/foodType/list')
        .subscribe((res: any) => {
          this.foodTypes = res.results;
          this.foodTypeId = this.foodTypes[0].id;
        });
    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }

  }

async save() {
    try {

      const fileName = await this.uploadFile()

      const payload = {
        foodTypeId: parseInt(this.foodTypeId.toString()),
        name: this.name,
        img: fileName,
        price: this.price,
        remark: this.remark,
        foodType: this.foodType,
        id: this.id,
      };

      if (this.id > 0) {
        this.http
          .put(config.apiServer + '/api/food/update', payload)
          .subscribe((res: any) => {
            this.fetchData();
            this.id = 0;
          });
      } else {
        this.http
          .post(config.apiServer + '/api/food/create', payload)
          .subscribe((res: any) => {
            this.fetchData();
          });
      }

      document.getElementById('modalFood_btnClose')?.click();
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      });
    }
  }

  fileSelected(file : any ){
    if (file.files != undefined) {
      if (file.files.length > 0) {
        this.file = file.files[0]
      }
    }
  }


 async uploadFile() {
    if(this.file !== undefined ){
      const formData = new FormData();
      formData.append('img', this.file);
      const res : any = await firstValueFrom(
        this.http.post(config.apiServer + '/api/food/upload', formData)
      )
      return res.fileName
    }
  }

  clearForm() {
   this.name = '',
   this.price = 0,
   this.file = undefined;
   this.remark = '',
   this.foodType = 'food ',
   this.id = 0;
  }
 

  async remove(item : any) {
      try {
        const button = await Swal.fire({
          title: 'ลบรายการ',
          text: 'คุณต้องการลบรายการใช่หรือไม่',
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true,
        })


        if (button.isConfirmed) {
          this.http
          .delete(config.apiServer + '/api/food/remove/' + item.id)
          .subscribe((res: any) => {
            this.fetchData();
          });
        }
      } catch (e:any) {
        Swal.fire({
          title: 'Error',
          text: e.message,
          icon: 'error',
        })
      }




  }

  edit(item : any) {
    this.id = item.id;
    this.name = item.name;
    this.foodTypeId = item.foodTypeId;
    this.foodType = item.foodType
    this.remark = item.remark;
    this.price = item.price;
    this.img = item.img;
  }
}