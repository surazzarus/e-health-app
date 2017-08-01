import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Upload } from '../../../upload';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: any;
  desc: any;
  owner: any;
  url: any = '';
  date: any = new Date();
  createdAt: any = this.date.getTime();

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  onAddSubmit() {
    let listing = {
      title: this.title,
      desc: this.desc,
      owner: this.owner,
      createdAt: this.createdAt,
      url: this.url
    }

    console.log(this.createdAt);

    this.firebaseService.addListing(listing);

    // Reset listing
    this.title = '';
    this.desc = '';
    this.owner = '';

    this._flashMessagesService.show('New Exercise added successfully!', { cssClass: 'alert-success', timeout: 3500 });
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
