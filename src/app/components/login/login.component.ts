import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()]
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    // when the app first loads, then check if the user is logged in and if yes, send them to 'listings'
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        console.log(auth);
        this.router.navigateByUrl('/profile');
      }
    })
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success) => {
          this.router.navigate(['/profile']);
        }).catch(
          (err) => {
            this.error = err;
        })
  }

  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success) => {
          this.router.navigate(['/profile']);
        }).catch(
          (err) => {
            this.error = err;
        })
  }


  ngOnInit() {
  }

}
