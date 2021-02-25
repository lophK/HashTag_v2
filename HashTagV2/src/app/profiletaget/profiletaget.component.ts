import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiletaget',
  templateUrl: './profiletaget.component.html',
  styleUrls: ['./profiletaget.component.css']
})
export class ProfiletagetComponent implements OnInit {
  email = history.state.email
  data : any
  src : any
  fname : any
  lname : any
  day :any
  tel : any
  address : any
  constructor(private sanitizer: DomSanitizer ,private http:HttpClient , private router_:Router) { }

  ngOnInit(): void {
    console.log("history")
    console.log(history.state.email)
    this.email = history.state.email
    this.getData();
  }

  async getData(){
    let json  ={email : this.email};
    console.log('E-mail');
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/users/user-data',(json)).subscribe(response=>{
      //console.log(json);
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log(this.data);
      // this.user_img = this.data.user_img;
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.user_img);
      this.fname = this.data.first_name;
      this.lname = this.data.last_name;
      this.tel = this.data.tel_phone;
      this.day = this.data.birthday;
      this.address = this.data.address;
    } 
    );
  }

}
