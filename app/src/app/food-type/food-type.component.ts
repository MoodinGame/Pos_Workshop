import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import Swal from 'sweetalert2';
import { MyModalComponent } from '../my-modal/my-modal.component';
@Component({
  selector: 'app-food-type',
  standalone: true,
  imports: [FormsModule ,MyModalComponent],
  templateUrl: './food-type.component.html',
  styleUrl: './food-type.component.css'
})
export class FoodTypeComponent implements OnInit {
   name : string = '';
   remark : string = '';
   foodTypes : any = [];

   constructor(private http: HttpClient) {}

 save(){
  try {
    const playload = {
      name : this.name,
      remark : this.remark
    };

    this.http.post(config.apiServer+ '/api/FoodType/create' , playload).subscribe((res) =>{
      console.log(res);
      this.fetchData();
    })
  } catch (e: any) {
    Swal.fire({
      title: 'Error!',
      text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      icon: 'error',
    })
  }
 }

 ngOnInit(){
   this.fetchData();
 }

 fetchData(){
  this.http.get(config.apiServer + '/api/FoodType/list').subscribe(( res : any) => {
    this.foodTypes = res.results;
  })
 }
}
