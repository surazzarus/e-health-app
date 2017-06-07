import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  getAuthenticated() {
    return firebase.auth().currentUser;
  }

/*
  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['/listings'])
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.error = err;
      });
  }
  */

}
