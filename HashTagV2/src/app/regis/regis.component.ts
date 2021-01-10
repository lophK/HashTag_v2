import { Component, OnInit } from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {
  hasttag = faHashtag
  siteKey: string;
  constructor() {
    this.siteKey = '6LdHeCcaAAAAADsC43gK77i1mL0Ro4kL2JLP9E48';
  }

  ngOnInit(): void {
  }

}
