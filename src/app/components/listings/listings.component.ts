import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings: any;
  listing: any;
  term: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Done as per angularfire2 way with async
    /*
    this.listings = this.firebaseService.getListings();
    console.log(this.listings);
    */

    // IF done using Brad's way using obserables and also dosen't work with 'async' on html
    this.firebaseService.getListings()
      .subscribe(listings => {
        console.log(listings);
        this.listings = listings
      })

  }

  head() {
    this.term = 'head';
  }
  neck() {
    this.term = 'neck';
  }
  lower_leg() {
    this.term = "lower leg";
  }
  thigh() {
    this.term = "thigh";
  }
  abdomen() {
    this.term = "abdomen";
  }
  rips() {
    this.term = "rips";
  }
  forearm() {
    this.term = "forearm";
  }
  upper_arm() {
    this.term = "upper-arm";
  }
  chest() {
    this.term = "chest";
  }
  ankle_foot() {
    this.term = "ankle-foot";
  }
  knee() {
    this.term = "knee";
  }
  hip() {
    this.term = "hip";
  }
  wrist() {
    this.term = "wrist";
  }
  elbow() {
    this.term = "elbow";
  }
  shoulder() {
    this.term = "shoulder";
  }
  hand() {
    this.term = "hand";
  }

  refresh() {
    this.term = "";
  }

}
