import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Blog } from '../../shared/models/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.route.data.forEach((data: { blogs: Blog[] } )=> {
        //console.log(data.blogs)
        this.blogs = data.blogs
      })
  }

}
