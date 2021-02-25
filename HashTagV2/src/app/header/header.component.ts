import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router_:Router) { }

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    this.router_.navigateByUrl("/");
  }

}
