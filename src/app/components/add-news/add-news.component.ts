import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

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

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  onNewsSubmit() {
    let news = {
      siteUrl: this.siteUrl,
      title: this.title,
      desc: this.desc,
      createdAt: this.createdAt
    }

    console.log(news)

    this.firebaseService.addNews(news);

    this.router.navigate(['/news']);
  }

  ngOnInit() {
  }

}
