import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  // siteKey: string;
  constructor(private http:HttpClient , private router_:Router) {
    // this.siteKey = '6LdHeCcaAAAAADsC43gK77i1mL0Ro4kL2JLP9E48';
  }
  // private handleError (error: Response | any) {
  //   //Your other codes    
    
  //   if (error.status == 0){ //or whatever condition you like to put
  //   this.router_.navigate(['/error']);
  //   }
  //   }
  ngOnInit(): void {
  }
  async register(){
    let json  ={first_name : this.first_name, last_name : this.last_name, email : this.email, password : this.password, tel_phone: this.tel_phone, address : this.address, birthday : this.birthday};
    console.log(this.first_name);
    console.log(this.last_name);
    console.log(this.email);
    console.log(this.password);
    console.log(this.tel_phone);
    console.log(this.address);
    console.log(this.birthday);
    
    console.log(json);//hashtagbe.comsciproject.com

    await this.http.post('http://localhost:3120/insert/register_ac',(json)).subscribe(response=>{
      console.log(json);
      this.router_.navigateByUrl("/");
      
    } 
    );
  }
}
