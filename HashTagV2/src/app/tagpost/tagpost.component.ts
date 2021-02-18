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
  dataSelect = 'CAT'
  email = localStorage.getItem('email')
  textStatus = ''

  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }

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
        this.src1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
    };
    
  }

  postdata(){

  }

  getSelect(data: any){
    this.dataSelect = data.value;
    console.log(this.dataSelect);
  }

}
