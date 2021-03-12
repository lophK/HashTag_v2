import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
// import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasttag = faHashtag;
  email = "";
  password = "";
  displayPosition: boolean = false;
  data: any;
  position: any;
  display: boolean = false
  constructor(private http: HttpClient, private router_: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router_.navigateByUrl("/");
    }
  }
  async login() {
    if (this.email == "" || this.password == "") {
      this.showPositionDialog('top');
    }
    else {
      let json = { email: this.email, password: this.password };
      //console.log(this.email);
      //console.log(this.password);
      //console.log(json);//hashtagbe.comsciproject.com
      //http://hashtagbe@hashtagbe.comsciproject.com/login/auth
      await this.http.post('http://localhost:3120/login/auth', (json)).subscribe(response => {
        let userx = JSON.stringify(response);
        this.data = JSON.parse(userx);
        console.log(this.data.email);
        localStorage.setItem(
          "email", this.data.email,

        );
        localStorage.setItem(

          "token", this.data.token
        );
        this.router_.navigateByUrl("/Homepage");
      }
      );
    }
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  Dialog(position: string) {
    this.position = position;
    this.display = true;
  }
}
