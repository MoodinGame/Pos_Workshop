import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../config';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {
  constructor(private http: HttpClient) { }

  id : number = 0;
  name : string = '';
  address : string = '';
  phone : string = '';
  email : string = '';
  website : string = '';
  promptPay : string = '';
  logo : string = '';
  txtCode : string = '';
  myFiles : any ;


  ngOnInit() {
    this.http.get(config.apiServer + 'api/organization/info').subscribe((data: any) => {
      this.id = data.id;
      this.name = data.name;
      this.address = data.address;
      this.phone = data.phone;
      this.email = data.email;
      this.website = data.website;
      this.promptPay = data.promptPay;
      this.logo = data.logo;
      this.txtCode = data.txtCode;
    });
  }

  save(){
     console.log("test");
     try {
      const playload = {
        id : this.id,
        name : this.name,
        address : this.address,
        phone : this.phone,
        email : this.email,
        website : this.website,
        promptPay : this.promptPay,
        logo : this.logo,
        txtCode : this.txtCode
      }
      
    this.http.post(config.apiServer + 'api/organization/save', playload).subscribe((data: any) => {
      Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย',
      text: 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว',
      showCancelButton: false,
      timer: 1500,
      })
    });
    } catch (e : any) {
      Swal.fire({
        icon: 'error',
        title: e.message,
        text: 'error',
      });
    }
  }

}
