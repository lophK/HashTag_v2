import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  displayBasic   : boolean = false

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
}

}
