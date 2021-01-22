import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser'; 


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {
  hasttag = faHashtag;
  first_name= "";
  last_name= "";
  email= "";
  password= "";
  tel_phone= "";
  address= "";
  birthday= "";
  siteKey: string;
  src1:any = "../../assets/images/user.png";
  base64: any;
  check: any;
  constructor(private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) {
    this.siteKey = '6LdsBDcaAAAAAD4qztWkmyFseeEKQiTRKG3cjp09';
  }
  ngOnInit(): void {
  }
  async register(){
    if(this.check){
      let json  ={first_name : this.first_name, last_name : this.last_name, email : this.email, password : this.password, tel_phone: this.tel_phone, address : this.address, birthday : this.birthday ,user_img:this.base64};
      console.log(this.first_name);
      console.log(this.last_name);
      console.log(this.email);
      console.log(this.password);
      console.log(this.tel_phone);
      console.log(this.address);
      console.log(this.birthday);
      
      console.log(json);//http://hashtagbe.comsciproject.com/insert/register_ac
  
      await this.http.post('http://hashtagbe.comsciproject.com/insert/register_ac',(json)).subscribe(response=>{
        console.log(json);
        this.router_.navigateByUrl("/");
        
      } 
      );
    }
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
  handleSuccess(){
    this.check = true
    console.log(this.check)
  }
}
