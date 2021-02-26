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
fname: any
lname:any
address: any
day: any
user_img:any
tel:any
  constructor(private sanitizer: DomSanitizer ,private http:HttpClient , private router_:Router) { }

  ngOnInit(): void {
    this.getData();
    
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
}
