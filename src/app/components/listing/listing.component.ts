import { AfterViewInit, Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

declare function videojs(id: any, options: any, ready: any): any;
//declare let videojs : any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements AfterViewInit, OnInit, OnDestroy {

  private _elementRef: ElementRef;

  id: any;
  listing: any;
  imageUrl: any;
  videoUrl: any;
  private videoJSplayer: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //// Fetch the ID from the URL ////
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      console.log(listing)
      this.listing = listing;
      this.videoUrl = listing.url;
      //console.log(this.listing)

      /////// Image part ///////
      /* Don't need the lower code if we use "snapshot.downloadURL;" on service */
      
      /*
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      storageRef.child(this.listing.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
        //console.log(this.imageUrl);
      }).catch((error) => {
        console.log(error);
      });
      */
    })
  }


  onDeleteClick() {
    //console.log(this.id);
    this.firebaseService.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }


  ngAfterViewInit() {
    this.videoJSplayer = videojs(document.getElementById(this.id), {}, function() {
      this.play();
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }

}
