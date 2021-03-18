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
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  closeResult = '';
  base64 : any
  src1 :any = '../../assets/images/user.png'
  src2 :any = '../../assets/images/user.png'
  dataSelect = 'CAT'
  email :any = localStorage.getItem('email')
  Poststatus : any = "public"
  tag_id :any;
  detail = '';
  file_img:any;
  file :any;
  data :any
  fname: any
  lname: any
  Tagname = ""
  datafollow : any
  tag_description = ""
  display: boolean = false
  datauser:any = []
  Lcout: any = 0
  viral: any
    showDialog() {
        this.display = true;
        console.log(this.display)
    }

  likeCoute(){
    this.Lcout = this.Lcout+1;
    console.log(this.Lcout)
    return this.Lcout;
  }

  test= "http://hashtagbe.comsciproject.com/images/1614295271477.jpg";
  status : any
  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.getpostAll();
    this.getTagAll();
    this.getData();
    this.getPost();
    this.getFollow();
    this.getTagAll1();
    this.getViral();
    if(localStorage.getItem('token') == null){
      this.router_.navigateByUrl("/");
    }
    this.primengConfig.ripple = true;
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

  setemail(email : any){
    localStorage.setItem(
      "emailvisit",email
  );
  this.router_.navigateByUrl("/VisitP");
  }

  convertimg(img: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  getFile(imageInput: any){
    console.log(imageInput.files[0]);
    let file = imageInput.files[0];
    let reader = new FileReader();
    let file_img = imageInput.files[0];
    this.file=file_img;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      let json = {
        base64: this.base64
      }
      console.log(this.base64)
        this.src1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
    };
    
  }

  async postdata(){

   
   /* tag_id
    post_id
    email_ac
    post_detail
    post_time
    post_status*/
      let json  ={tag_id : this.tag_id, email_ac : this.email, post_detail : this.detail, post_status: this.Poststatus,file_img:this.file};
      console.log(this.tag_id);
      console.log(this.email);
      console.log(this.detail);
      console.log(this.Poststatus);
      console.log(this.file);

      //console.log(json);//http://hashtagbe.comsciproject.com/insert/register_ac
  
      await this.http.post('http://localhost:3120/insert/Post_',(json)).subscribe(response=>{
        //console.log(json);
        location.reload();
       if(response){
          console.log(response);
          let p_id = JSON.stringify(response);
          let pid = JSON.parse(p_id);

          var formdata = new FormData();
          formdata.append("file", this.file);
          formdata.append("post_id",pid.post_id);
          formdata.append("post_detail",this.detail);
          formdata.append("post_status",this.Poststatus);
          formdata.append("email_ac",this.email);
          formdata.append("tag_id",this.tag_id);
         // formdata.append("tag_id",'1');
          let js2 = {tag_id : this.tag_id, email_ac : this.email, post_detail : this.detail, post_status: this.Poststatus,file:this.file ,post_id:pid.post_id};
          if(this.file != null){
               this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/insert/upload_image',formdata).subscribe(response=>{
              
                console.log(formdata);
                location.reload();
                  } 
              );
          }
          else{
            location.reload();
          }
     
        }
        location.reload();
       } 
      );
      
    
  }

  getSelect(data: any){
    this.tag_id = data.value;
    console.log(this.tag_id);
  }

  async getData(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/users/user-data',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log(this.data);
      this.src2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.user_img);
      this.fname = this.data.first_name;
      this.lname = this.data.last_name;
    } 
    );
  }

  async getPost(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/select/select_post',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log('data');
      console.log(this.data);
    } 
    );
  }

  async CreateTag(){
    let json  ={email : localStorage.getItem('email'), tag_name : this.Tagname, tag_description : this.tag_description};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://localhost:3120/insert/tag_',(json)).subscribe(response=>{
      location.reload();
    } 
    );
  }

  getSelectstatus(value : any){
    this.Poststatus = value.value;
  }

  async getDataUser(email1 : any, i :any){
    let json  ={email : email1};
    await this.http.post('http://localhost:3120/users/user-data',(json)).subscribe(response=>{
      //console.log(json);
      let userx = JSON.stringify(response);
      this.datauser[i] = JSON.parse(userx);
      console.log('user')
      console.log(this.datauser);
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
      for (let i = 0; i < this.datafollow.length; i++) {
        this.getDataUser(this.datafollow[i].follow_email, i);
      }
    } 
    );
  }

  async getTagAll1(){
    let json  ={email : localStorage.getItem('email')};
    console.log(json);
    console.log(localStorage.getItem('email'));
    console.log(json);
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/select/select_tag_all',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.Tag = JSON.parse(userx);
      console.log(this.Tag)
      this.tag_id = this.Tag[0].tag_id;
      console.log(this.tag_id);
    } 
    );
  }

  async getViral(){
    let json  ={email : localStorage.getItem('email')};
    await this.http.post('http://localhost:3120/select/viral_Tag',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.viral = JSON.parse(userx);
      console.log("viral_tag")
      console.log(this.viral)
    } 
    );
  }
}
