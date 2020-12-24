import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
// import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasttag = faHashtag;

  public username: any;
  public password: any;
  constructor(private http:HttpClient) {
   
   }
 
  ngOnInit(): void {
  }
  login(){

    let json  ={username : this.username, password : this.password};
    console.log(this.password);
    this.http.post('http://localhost:3120/login/auth',JSON.stringify(json)).subscribe(response=>{
      console.log("OK");
    } 
    );
  }
}
