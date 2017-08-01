import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  siteUrl: any;
  title: any;
  desc: any;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  onNewsSubmit() {
    let news = {
      siteUrl: this.siteUrl,
      title: this.title,
      desc: this.desc,
      createdAt: this.createdAt
    }

    console.log(news)

    this.firebaseService.addNews(news);

    this._flashMessagesService.show('New News added successfully!', { cssClass: 'alert-success', timeout: 3500 });
  }

  ngOnInit() {
  }

}
