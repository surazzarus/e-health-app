import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Listing } from '../models/listing';
import { News } from '../models/news';
import { Nutrition } from '../models/nutrition';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<Listing[]>;
  listing: FirebaseObjectObservable<Listing>;
  news: FirebaseListObservable<News[]>;
  nutritions: FirebaseListObservable<Nutrition[]>;
  folder: any;
  newsFolder: any;
  nutritionsFolder: any;

  iRef: firebase.storage.UploadTask;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'listingimages';
    this.newsFolder = 'newsimages';
    this.nutritionsFolder = 'nutritionsimages';
    this.listings = this.db.list('/listings', {
      query: {
        // We can use query if needed
        /*
        limitToLast: 10,
        orderByKey: true
        */
      }
    }) as FirebaseListObservable<Listing[]>;

    this.news = this.db.list('/news') as FirebaseListObservable<News[]>;

    this.nutritions = this.db.list('/nutritions') as FirebaseListObservable<Nutrition[]>;
  }

  /**
   * Get all listings
   */
  getListings(): FirebaseListObservable<Listing[]> {
    return this.listings;
  }

  /**
   * Get all news
   */
  getNews(): FirebaseListObservable<News[]> {
    return this.news;
  }

  /**
   * Get all nutritions
   */
  getNutritions(): FirebaseListObservable<Nutrition[]> {
    return this.nutritions;
  }

  /**
   * Get single listing
   */
  getListingDetails(id): FirebaseObjectObservable<Listing> {
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

  /**
   * Add single listing
   */
  addListing(listing) {

    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      //console.log(path);
      this.iRef = storageRef.child(path).put(selectedFile);

      this.iRef.on(firebase.storage.TaskEvent.STATE_CHANGED),
        (snapshot) => {
          listing.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
      (error) => {
        // If upload failed
        console.log(error)
      }

      this.iRef.then((snapshot) => {
        console.log(snapshot)
        listing.url = snapshot.downloadURL;
        //listing.image = selectedFile.name;
        listing.path = path;
        //console.log(path);
        return this.listings.push(listing);
      });
    }
  }

  addNews(news) {

    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('news-image')).files[0]]) {
      let path = `/${this.newsFolder}/${selectedFile.name}`;
      //console.log(path);
      let imageRef = storageRef.child(path);
      imageRef.put(selectedFile).then((snapshot) => {
        news.url = snapshot.downloadURL;
        console.log(news.url);
        news.path = path;
        //console.log(path);
        return this.news.push(news);
      });
    }
  }

  addNutrition(nutrition) {

    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('news-image')).files[0]]) {
      let path = `/${this.nutritionsFolder}/${selectedFile.name}`;
      //console.log(path);
      let imageRef = storageRef.child(path);
      imageRef.put(selectedFile).then((snapshot) => {
        nutrition.url = snapshot.downloadURL;
        console.log(nutrition.url);
        nutrition.path = path;
        //console.log(path);
        return this.nutritions.push(nutrition);
      });
    }
  }

  updateListing(id, listing) {
    return this.listings.update(id, listing);
  }

  deleteListing(id) {
    return this.listings.remove(id);
  }

  getImages() {
    return this.listings;
  }
}
