import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: any;
  desc: any;
  owner: any;
  image: any;
  url: any;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  onAddSubmit() {
    let listing = {
      title: this.title,
      desc: this.desc,
      owner: this.owner,
      createdAt: this.createdAt
    }

    console.log(this.createdAt);

    this.firebaseService.addListing(listing);

    this.router.navigate(['listings']);
  }

  ngOnInit() {
  }

}
