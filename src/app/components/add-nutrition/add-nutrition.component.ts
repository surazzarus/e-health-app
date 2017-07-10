import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-nutrition',
  templateUrl: './add-nutrition.component.html',
  styleUrls: ['./add-nutrition.component.css']
})
export class AddNutritionComponent implements OnInit {
  title: any;
  desc: any;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  onNutritionSubmit() {
    let nutrition = {
      title: this.title,
      desc: this.desc,
      createdAt: this.createdAt
    }

    console.log(nutrition)

    this.firebaseService.addNutrition(nutrition);

    this.router.navigate(['/nutritions']);
  }

  ngOnInit() {
  }

}
