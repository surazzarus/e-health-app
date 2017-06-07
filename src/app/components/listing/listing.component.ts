import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //// Fetch the ID from the URL ////
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;
      console.log(this.listing)

      // Image part
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      storageRef.child(this.listing.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
        //console.log(this.imageUrl);
      }).catch((error) => {
        console.log(error);
      });
    })
  }

  onDeleteClick() {
    //console.log(this.id);
    this.firebaseService.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }

}
