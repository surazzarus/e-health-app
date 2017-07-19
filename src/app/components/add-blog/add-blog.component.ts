import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  title: string;
  author: string;
  transformedDate: string = new Date().toJSON().slice(0,10).replace(/-/g,'.');
  desc: string;
  date: any = new Date();
  createdAt: any = this.date.getTime();

  myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy.mm.dd',
    };
  currentDate: string = this.transformedDate ;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) {
    console.log(this.createdAt)
    console.log(this.currentDate)
    console.log(this.transformedDate)
  }

  onBlogSubmit() {
    let blog = {
      title: this.title,
      author: this.author,
      currentDate: this.currentDate,
      desc: this.desc,
      createdAt: this.createdAt
    }

    console.log(blog)

    this.firebaseService.addBlog(blog);

    this.router.navigate(['/add-blog']);

    // Reset the fields
    this.title = '';
    this.author = '';
    this.currentDate = '';
    this.desc = '';

    this._flashMessagesService.show('New Blog added successfully!', { cssClass: 'alert-success', timeout: 5000 });

  }

  ngOnInit() {
  }

}
