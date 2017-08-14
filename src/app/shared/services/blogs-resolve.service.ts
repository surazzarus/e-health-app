import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Blog } from '../../shared/models/blog';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';

@Injectable()
export class BlogsResolve implements Resolve<Blog> {

  constructor(private firebaseService: FirebaseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    return this.firebaseService.getBlogs().map(blogs => {
      //console.log(blogs)
      return blogs;
    }).first();
  }
}
