import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import config from '../config';
import { FormsModule } from '@angular/forms';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [FormsModule,MyModalComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {


  foods: any = [];
  apiPath: string = ''
  tableNo: number = 1;
  userId: number | undefined = 0;
  saleTemps: any = [];
  amount: number = 0;
  foodSizes: any = [];
  saleTempId: number | undefined = 0;
  foodName: string =  '';
  qty: number = 0;

  constructor(private http: HttpClient) {

  }



  selectFoodSize(saleTempId : number ,foodTypeId : number){

  }

  chooseFoodSize(item : any){
    let foodTypeId = item.Food.foodTypeId;
    this.saleTempId = item.id;
    this.foodName = item.Food.name;
    this.qty = item.qty;
    
    try {
      this.http
      .get(config.apiServer + '/api/foodSize/filter/' + foodTypeId)
      .subscribe((res: any) => {
        this.foodSizes = res.results;
      });
    } catch (e:any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }
  }

  ngOnInit() {
    this.fetchData()
    this.apiPath = config.apiServer;
    const userId = localStorage.getItem('angular_id');
    if (userId !== null) {
      this.userId = parseInt(userId)
      this.fetchDataSaleTemp()
    }

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

  filterFoods() {
    this.filter('food')
  }

  filterDrinks() {
    this.filter('drink')
  }

  filter(foodType: string) {
    try {
      this.http
        .get(config.apiServer + '/api/food/filter/' + foodType)
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

  saveToSaleTemp(item: any) {

    try {
      const payload = {
        qty: 1,
        tableNo: this.tableNo,
        foodId: item.id,
        userId: this.userId,
      }

      this.http.post(config.apiServer + '/api/saleTemp/create', payload)
        .subscribe((res: any) => {
          this.fetchDataSaleTemp();
        })


    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }
  }
  fetchDataSaleTemp() {
    try {
      this.http.get(config.apiServer + '/api/saleTemp/list/' + this.userId)
        .subscribe((res: any) => {
          this.saleTemps = res.results;
          this.amount = 0;
          for (let i = 0; i < this.saleTemps.length; i++) {
            const item = this.saleTemps[i];
            const price = item.price;
            const qty = item.qty;
            this.amount += (price * qty);
          }
        })
    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }
  }
  async clearAllRow() {
    const button = await Swal.fire({
      title: 'ล้างรายการ',
      text: 'คุณต้องการล้างรายการทั้งหมดใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    })

    if (button.isConfirmed) {
      try {
        this.http.delete(config.apiServer + '/api/saleTemp/clear/' + this.userId)
          .subscribe((res: any) => {
            this.fetchDataSaleTemp();
          })

      } catch (e: any) {
        Swal.fire({
          title: 'Error',
          text: e.message,
          icon: 'error',
        })
      }
    }
  }
  async removeItem(item: any) {
    try {
      const button = await Swal.fire({
        title: 'ลบ ' + item.Food.name,
        text: 'คุณต้องการลบ ' + item.Food.name + ' ใช่หรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })

      if (button.isConfirmed) {
        this.http.delete(config.apiServer + '/api/saleTemp/remove/' + item.foodId + '/' + this.userId)
          .subscribe((res: any) => {
            this.fetchDataSaleTemp();
          })
      }

    } catch (e: any) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }
  }


// downQty(item: any){
//  try {
//   this.http
//         .put(config.apiServer + '/api/saleTemp/changeQty', item.id)
//         .subscribe((res: any) => {
//           this.fetchDataSaleTemp();
//         });
//  } catch (e: any) {
//   Swal.fire({
//     title: 'Error',
//     text: e.message,
//     icon: 'error',
//   })
//  }

// }

// upQty(item: any){
//   try {
//     this.http
//           .put(config.apiServer + '/api/saleTemp/changeQty', item.id)
//           .subscribe((res: any) => {
//             this.fetchDataSaleTemp();
//           });
//   } catch (e: any) {
//    Swal.fire({
//      title: 'Error',
//      text: e.message,
//      icon: 'error',
//    })
//   }
// }

  changeQty(id: number, style: string) {
    try {
      const payload = {
        id: id,
        style: style,
      };
      this.http
          .put(config.apiServer + '/api/saleTemp/changeQty', payload)
          .subscribe((res: any) => {
            this.fetchDataSaleTemp();
          });
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error',
      });
    }
  }
}
