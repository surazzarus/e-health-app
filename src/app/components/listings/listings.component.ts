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
  name: any;
  listings: any;
  listing: any;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth) {
    // shows the name
    this.afAuth.authState.subscribe(auth => {
      //console.log(auth)
      if(auth) {
        /* Show display name OR only name before '@' in email */
        this.name = auth.displayName || auth.email.split('@')[0];
        //console.log(auth.displayName);
      }
    })
  }

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

}
