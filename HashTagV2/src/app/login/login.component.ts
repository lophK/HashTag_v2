import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
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
  }
  async login(){
    let json  ={email : this.email, password : this.password};
    //console.log(this.email);
    //console.log(this.password);
    //console.log(json);//hashtagbe.comsciproject.com
    //http://hashtagbe@hashtagbe.comsciproject.com/login/auth
    await this.http.post('http://localhost:3120/login/auth',(json)).subscribe(response=>{
      //console.log(json);
      let userx = JSON.stringify(response);
      this.data = JSON.parse(userx);
      console.log(this.data);
      localStorage.setItem(
          "email",this.data
      );
      //console.log(userx);
      this.router_.navigateByUrl("/Homepage");
    } 
    );
  }
}
