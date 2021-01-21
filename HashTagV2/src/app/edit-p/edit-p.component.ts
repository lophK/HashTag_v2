import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';  

@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.css']
})
export class EditPComponent implements OnInit {
  src1: any = this.sanitizer.bypassSecurityTrustResourceUrl('img')
  fname:any = sessionStorage.getItem('fname')
  lname:any = sessionStorage.getItem('lname')
  base64 : any
  address1:any = sessionStorage.getItem('address')
  tel: any = sessionStorage.getItem('tel')

  first_name= "";
  last_name= "";
  email= "";
  password= "";
  tel_phone= "";
  address= "";
  birthday= "";
  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
  }
  getFile(imageInput: any){
    console.log(imageInput.files[0]);
    let file = imageInput.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      let json = {
        base64: this.base64
      }
      console.log(this.base64)
        this.src1= this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
    };

  }

}
