import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import config from '../config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {

  foods : any[] = [];
  apiPath: string = ''


  constructor(private http: HttpClient) {

  }



  ngOnInit() {
    this.fetchData()
    this.apiPath = config.apiServer;
  }
  fetchData() {
    try {
      this.http
        .get(config.apiServer + '/api/food/list')
        .subscribe((res: any) => {
          this.foods = res.results;
        })

    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      });
    }
  }

  filterFoods(){
    this.filter('food')
  }

  filterDrinks(){
   this.filter('drink')
  }

  filter(foodTypes : string){
    try {
      this.http
       .get(config.apiServer + '/api/food/filter/' + foodTypes)
       .subscribe((res: any) => {
          this.foods = res.results;
        })
    } catch (e : any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      }); 
    }

  }



}
