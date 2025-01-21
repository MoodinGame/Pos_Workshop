import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import config from '../config';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {
  constructor(private http: HttpClient){}

  name: string ='';
  phone: string = '';
  address: string = '';
  taxCode: string = '';
  id: number = 0;
  logo: string = '';
  email: string = '';
  website: string = '';
  promptPay: string = '';
  myFile: any;
  logoPath: string = '';

  ngOnInit() {
    this.http.get(config.apiServer + '/api/organization/info')
    .subscribe((data: any) => {
      this.name = data.name;
      this.phone = data.phone;
      this.address = data.address;
      this.taxCode = data.taxCode;
      this.id = data.id;
      this.logo = data.logo;
      this.email = data.email;
      this.website = data.website;
      this.promptPay = data.promptPay;
      this.logoPath = config.apiServer + '/uploads/' + this.logo;
    })
  }

  async save() {
    try {
      // const fileName = await this.upload();
      const payload = {
        name: this.name,
        phone: this.phone,
        address: this.address,
        taxCode: this.taxCode,
        id: this.id,
        logo: this.logo,
        email: this.email,
        website: this.website,
        promptPay: this.promptPay
      }

      this.http.post(config.apiServer + '/api/organization/save', payload)
      .subscribe((data: any) => {
        Swal.fire({
          icon: 'success',
          text: 'บันทึกข้อมูลสำเร็จ',
          title: 'บันทึกข้อมูล',
          showConfirmButton: true,
          timer: 1500
        })
      })
    } catch (e: any) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  } 

  // onFileChange(event: any) {
  //   if (event.target.files != null) {
  //     if (event.target.files.length > 0) {
  //       this.myFile = event.target.files[0];
  //     }
  //   }
  // }

  // async upload() { 
  //   if (this.myFile !== undefined) {
  //     const formData = new FormData();
  //     formData.append('myFile', this.myFile);
  //     const url = config.apiServer + '/api/organization/upload';
  //     const res:any = await firstValueFrom(this.http.post(url, formData));

  //     return res.fileName;
  //   }
  // }

}