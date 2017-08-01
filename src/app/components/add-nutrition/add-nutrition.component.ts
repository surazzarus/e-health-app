import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-nutrition',
  templateUrl: './add-nutrition.component.html',
  styleUrls: ['./add-nutrition.component.css']
})
export class AddNutritionComponent implements OnInit {
  title: any;
  ingredients: any;
  desc1: any;
  desc2: any;
  desc3: any;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  onNutritionSubmit() {
    let nutrition = {
      title: this.title,
      ingredients: this.ingredients,
      desc1: this.desc1,
      desc2: this.desc2,
      desc3: this.desc3,
      createdAt: this.createdAt
    }

    console.log(nutrition)

    this.firebaseService.addNutrition(nutrition);

    // reset input fields
    this.title = '';
    this.ingredients = '';
    this.desc1 = '';
    this.desc2 = '';
    this.desc3 = '';

    this._flashMessagesService.show('New Blog added successfully!', { cssClass: 'alert-success', timeout: 3000 });
  }

  ngOnInit() {
  }

}
