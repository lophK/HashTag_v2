import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.css']
})
export class EditPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  getFile(imageInput: any){
    console.log(imageInput.files[0]);
    // document.getElementById("Profile").src = "../../assets/images/"+imageInput.files[0].name;
  }

}
