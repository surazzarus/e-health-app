import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.css']
})
export class NutritionsComponent implements OnInit {
  nutrition: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getNutritions()
      .subscribe(nutrition => {
        //console.log(news);
        this.nutrition = nutrition;
      })
  }

}
