import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

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
    this.nutritionsFolder = 'nutritionsimages'
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

  getListings() {
    return this.listings;
  }

  getNews() {
    return this.news;
  }

  getNutritions() {
    return this.nutritions;
  }

  getListingDetails(id) {
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

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
        // upload failed
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

interface Listing {
    $key?: string;
    title?: string;
    image?: string;
    owner?: string;
    createdAt?: any;
    file: File;
    progress: number;
    desc?: string;
    url?: string;
}

interface News {
  $key?: string;
  siteUrl?: string;
  title?: string;
  desc?: string;
  path?: string;
  createdAt?: any;
}

interface Nutrition {
  $key?: string;
  title?: string;
  desc?: string;
  createdAt?: any;
}
