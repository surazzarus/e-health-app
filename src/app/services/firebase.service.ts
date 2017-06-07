import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  news: FirebaseListObservable<any[]>;
  folder: any;
  newsFolder: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'listingimages';
    this.newsFolder = 'newsimages';
    this.listings = this.db.list('/listings', {
      query: {
        // We can use query if needed
        /*
        limitToLast: 10,
        orderByKey: true
        */
      }
    }) as FirebaseListObservable<Listing[]>;

    this.news = this.db.list('/news', {
      query: {
        limitToLast: 6,
        orderByChild: 'createdAt'
      }
    }) as FirebaseListObservable<News[]>;
  }

  getListings() {
    return this.listings;
  }

  getNews() {
    return this.news;
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
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.url = snapshot.downloadURL;
        console.log(listing.url);
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
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        news.url = snapshot.downloadURL;
        console.log(news.url);
        news.path = path;
        //console.log(path);
        return this.news.push(news);
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
    type?: string;
    image?: string;
    city?: string;
    owner?: string;
    bedrooms?: string;
}

interface News {
  $key?: string;
  siteUrl?: string;
  title?: string;
  desc?: string;
}
