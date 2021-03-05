import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  post: any
  Tag :any
  send = faPaperPlane
  p = faPlane
  pen = faEdit
  like = faThumbsUp
  dislike = faThumbsDown
  comment = faComments
  share = faShareAltSquare
  displayModal: boolean = false;
  displayBasic: boolean = false;
  displayBasic2: boolean = false;
  displayMaximizable: boolean = false;
  displayPosition: boolean = false;
  position: any;
  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getpostAll();
    this.getTagAll();
    if(localStorage.getItem('token') == null){
      this.router_.navigateByUrl("/");
    }
  }
  showModalDialog() {
      this.displayModal = true;
  }

  showBasicDialog() {
      this.displayBasic = true;
  }

  showBasicDialog2() {
      this.displayBasic2 = true;
  }

  showMaximizableDialog() {
      this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
      this.position = position;
      this.displayPosition = true;
  }

  async getpostAll(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/select/select_post_all',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.post = JSON.parse(userx);
      console.log('post');
      console.log(this.post);
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
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/select/select_tag_all',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.Tag = JSON.parse(userx);
      console.log(this.Tag)
    } 
    );
  }

  display: boolean = true;

    showDialog() {
        this.display = true;
    }

  setemail(email : any){
    localStorage.setItem(
      "emailvisit",email
  );
  this.router_.navigateByUrl("/VisitP");
  }

  convertimg(img: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

}
