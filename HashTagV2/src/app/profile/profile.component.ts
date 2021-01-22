import { Component, OnInit } from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
pen = faEdit
like = faThumbsUp
dislike = faThumbsDown
comment = faComments
share = faShareAltSquare
img:any = sessionStorage.getItem('img')
src: any
fname: any = sessionStorage.getItem('fname')
lname: any = sessionStorage.getItem('lname')
email: any = sessionStorage.getItem('email')
day: any = sessionStorage.getItem('date')
address: any = sessionStorage.getItem('address')
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('img'));
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.img);

}
}