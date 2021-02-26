import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
// import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hasttag = faHashtag;
  email = "";
  password = "";
 
  data: any;
  constructor(private http:HttpClient , private router_:Router) {
   
   }
 
  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.router_.navigateByUrl("/");
    }
  }
  async login(){
    let json  ={email : this.email, password : this.password};
    //console.log(this.email);
    //console.log(this.password);
    //console.log(json);//hashtagbe.comsciproject.com
    //http://hashtagbe@hashtagbe.comsciproject.com/login/auth
    await this.http.post('http://hashtagbe@hashtagbe.comsciproject.com/login/auth',(json)).subscribe(response=>{
      //console.log(json);
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log(this.data.email);
      localStorage.setItem(
          "email",this.data.email,
     
      );
      localStorage.setItem(
      
        "token",this.data.token
    );
  
    
      //console.log(userx);
      this.router_.navigateByUrl("/Homepage");
    } 
    );
    // let json1 = {
    //   email: this.email
    // }
    // let header = new HttpHeaders({
    //   'Content-Type' : 'application/json',
    //   'authorization' : 'super ultimate secret key'
    // })
  }
}
