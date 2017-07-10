import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public authState$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.authState$ = afAuth.authState;
  }

  /*
  getAuthenticated() {
    console.log(firebase.auth())
    console.log(this.afAuth.authState)
    return firebase.auth().currentUser;
  }
  */

}
