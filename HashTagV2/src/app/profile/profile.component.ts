import { Component, OnInit } from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';  
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
pen = faEdit
like = faThumbsUp
dislike = faThumbsDown
comment = faComments
share = faShareAltSquare
src: any = ""
email: any = localStorage.getItem('email')
data: any
data2 : any
fname: any
lname:any
address: any
day: any
user_img:any
datafollow : any

tel:any
  constructor(private sanitizer: DomSanitizer ,private http:HttpClient , private router_:Router) { }

  ngOnInit(): void {
    this.getData();
    this.getPost();
    this.getFollow();
    if(localStorage.getItem('token') == null){
      this.router_.navigateByUrl("/");
    }
}

async getData(){
  let json  ={email : this.email};
  console.log('E-mail');
  console.log(localStorage.getItem('email'));
  console.log(json);
  await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/users/user-data',(json)).subscribe(response=>{
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
convert(img: any){
  return this.sanitizer.bypassSecurityTrustResourceUrl(img);
}

async getPost(){
  let json  ={email : localStorage.getItem('email')};
  console.log(json);
  console.log(localStorage.getItem('email'));
  console.log(json);
  await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/select/select_post',(json)).subscribe(response=>{
    let userx = JSON.stringify(response);
    this.data2 = JSON.parse(userx);
    console.log('data2');
    console.log(this.data2);
  } 
  );
}

async getFollow(){
  let json  ={email : localStorage.getItem('email')};
  console.log(json);
  console.log(localStorage.getItem('email'));
  console.log(json);
  await this.http.post('http://localhost:3120/select/select_follwing',(json)).subscribe(response=>{
    let userx = JSON.stringify(response);
    this.datafollow = JSON.parse(userx);
    console.log('data3');
    console.log(this.datafollow);
  } 
  );
}
}
