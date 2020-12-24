import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
face = faFacebookF
ig = faInstagramSquare
tw = faTwitterSquare
p = faPinterest

  constructor() { }

  ngOnInit(): void {
  }

}
