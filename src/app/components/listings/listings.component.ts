import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
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
        //console.log(listings);
        this.listings = listings
      })

  }

  bodyParts(parts) {
    this.term = parts;
  }

  refresh() {
    this.term = "";
  }

}
