import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viral',
  templateUrl: './viral.component.html',
  styleUrls: ['./viral.component.css']
})
export class ViralComponent implements OnInit {
  viral :any

  constructor(private modalService: NgbModal, private http:HttpClient , private router_:Router, private sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getViral();
  }

  async getViral(){
    let json  ={email : localStorage.getItem('email')};
    await this.http.post('http://localhost:3120/select/viral_Tag',(json)).subscribe(response=>{
      let userx = JSON.stringify(response);
      this.viral = JSON.parse(userx);
      console.log("viral")
      console.log(this.viral)
    } 
    );
  }

}
