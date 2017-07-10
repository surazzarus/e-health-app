import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import { Upload } from '../../../upload';
import * as _ from "lodash";

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

  selectedFiles: FileList;
  currentUpload: Upload;

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

    this.router.navigate(['/listings']);
  }

/*
  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    console.log(this.currentUpload)
    this.firebaseService.addListing(this.currentUpload)
  }
  */

  ngOnInit() {
  }

}
