import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.css']
})
export class EditPComponent implements OnInit {
  src1: any 
  fname:any = sessionStorage.getItem('fname')
  lname:any = sessionStorage.getItem('lname')
  base64 : any
  address1:any = sessionStorage.getItem('address')
  tel: any = sessionStorage.getItem('tel')
  img :any = sessionStorage.getItem('img')
  first_name= "";
  last_name= "";
  email=sessionStorage.getItem('email');
  password= "";
  tel_phone= "";
  address= "";
  birthday= "";
  data:any;
  constructor(private http:HttpClient , private router_:Router,private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.src1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.img);
  }
  async edit(){
    let json  ={first_name : this.first_name, last_name : this.last_name, email : this.email, password : this.password, tel_phone: this.tel_phone, address : this.address, birthday : this.birthday ,user_img:this.base64};
    console.log(this.email);
    console.log(this.password);
    console.log(json);//hashtagbe.comsciproject.com
    //http://hashtagbe@hashtagbe.comsciproject.com/login/auth
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/edit/edit_ac2',(json)).subscribe(response=>{
      //console.log(json);
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      sessionStorage.setItem(
          "fname",this.data.first_name
      );
      sessionStorage.setItem(
          "lname",this.data.last_name
      );
      sessionStorage.setItem(
          "email",this.data.email
      );
      sessionStorage.setItem(
          "img",this.data.user_img
      );
      sessionStorage.setItem(
        "date", this.data.birthday
      );
      sessionStorage.setItem(
        "tel", this.data.tel_phone
      );
      sessionStorage.setItem(
        "address", this.data.address
      );
      console.log(userx);
      this.router_.navigateByUrl("/Profile");
    } 
    );
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
