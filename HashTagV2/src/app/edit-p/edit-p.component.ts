import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.css']
})
export class EditPComponent implements OnInit {
  src1 ="../../assets/images/cat3.jpg"

  constructor() { }

  ngOnInit(): void {
  }
  getFile(imageInput: any){
    console.log(imageInput.files[0]);
    this.src1= "../../assets/images/"+imageInput.files[0].name;
  }

}
