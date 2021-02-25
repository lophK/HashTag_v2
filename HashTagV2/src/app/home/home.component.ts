import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  post: any
  Tag :any
  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getpostAll();
    this.getTagAll();
  }

  async getpostAll(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/select/select_post_all',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.post = JSON.parse(userx);
      console.log(this.post)
    } 
    );
  }

  convert(img: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  async getTagAll(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/select/select_tag_all',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.Tag = JSON.parse(userx);
      console.log(this.Tag)
    } 
    );
  }

}
