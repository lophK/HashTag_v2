import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasttag = faHashtag
  constructor() { }

  ngOnInit(): void {
  }

}
