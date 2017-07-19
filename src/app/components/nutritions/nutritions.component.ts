import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Nutrition } from '../../shared/models/nutrition';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.css']
})
export class NutritionsComponent implements OnInit {
  nutritions: Nutrition[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getNutritions()
      .subscribe(nutritions => {
        //console.log(news);
        this.nutritions = nutritions;
        console.log(typeof(nutritions))
      })
  }

}
