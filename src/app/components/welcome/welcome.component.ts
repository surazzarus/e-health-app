import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Export this property to navbar to hide the content when this component is active
  showNav:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
