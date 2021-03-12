import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tagpost',
  templateUrl: './tagpost.component.html',
  styleUrls: ['./tagpost.component.css']
})
export class TagpostComponent implements OnInit {
  closeResult = '';
  base64 : any
  src1 :any = '../../assets/images/user.png'
  src2 :any = '../../assets/images/user.png'
  dataSelect = 'CAT'
  email :any = localStorage.getItem('email')
  Poststatus = 'public'
  tag_id :any;
  detail = '';
  file_img:any;
  file :any;
  data :any
  fname: any
  lname: any
  Tagname = ""
  tag_description = ""
  Tag :any
  test= "http://hashtagbe.comsciproject.com/images/1614295271477.jpg";
  status : any

  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  this.getData();
  this.getPost();
  this.getTagAll();
  if(localStorage.getItem('token') == null){
    this.router_.navigateByUrl("/");
  }
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
  
      await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/insert/Post_',(json)).subscribe(response=>{
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
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/users/user-data',(json)).subscribe(response=>{
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
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/select/select_post',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log('data');
      console.log(this.data);
    } 
    );
  }

  async CreateTag(){
    var formdata1 = new FormData();
          formdata1.append("file", this.file);
          formdata1.append("tag_name",this.Tagname);
          formdata1.append("owner_tag",this.email);
    await this.http.post('http://localhost:3120/insert/tag_',formdata1).subscribe(response=>{
      location.reload();
    } 
    );
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
      this.tag_id = this.Tag[0].tag_id;
      console.log(this.tag_id);
    } 
    );
  }

  getSelectstatus(value : any){
    this.status = value.value;
  }

}
