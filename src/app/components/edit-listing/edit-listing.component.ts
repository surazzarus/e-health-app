import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id: any;
  title: any;
  desc: any;
  owner: any;
  image: any;
  url: any;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      //console.log(listing);
      this.title = listing.title;
      this.owner = listing.owner;
      this.desc = listing.desc,
      this.createdAt = listing.createdAt
    })
  }

  onEditSubmit() {
    let listing = {
      title: this.title,
      desc: this.desc,
      owner: this.owner,
      createdAt: this.createdAt
    }

    this.firebaseService.updateListing(this.id, listing);

    this.router.navigate(['/listings']);
  }

}
