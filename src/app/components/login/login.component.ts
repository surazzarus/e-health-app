import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  users: FirebaseListObservable<User[]>;
  error: any;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
  }

  /*
  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success) => {
          this.router.navigate(['/profile']);
        }).catch(
          (err) => {
            this.error = err;
        })
  }
  */


  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        // Checking if the email exists in the database
          this.users.subscribe(users => {
            //console.log(users) // Displays array of objects

            // Scanning through the array of objects to see if new email match the existing email in database
            var ifExists = users.some(function(el) {
              return el.email === data.user.email;
            });


            if(!ifExists) {
              // If email does not exists in the database i.e. New user
              let currentUserUid = this.afAuth.auth.currentUser.uid; // Get 'currentUserUid'
              this.db.object(`users/${currentUserUid}`).update({
                email: data.user.email,
                name: data.user.displayName
              });
              //console.log('New data info added to database');

              this.router.navigate(['/welcome']);
              /* Stop javascript's execution */
              throw new Error("Changing route to welcome screen for new user!");
            }

            else {
              // If user already exists
              this.router.navigate(['/profile']);
              //console.log('Data info already exists in database');
            }
          })

          console.log(data.user.email)

        }).catch(
          (err) => {
            this.error = err;
        })
  }


  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((data) => {
      // Checking if the email exists in the database
        this.users.subscribe(users => {
          console.log(users) // Displays array of objects

          // Scanning through the array of objects to see if new email match the existing email in database
          var ifExists = users.some(function(el) {
            return el.email === data.user.email;
          });


          if(!ifExists) {
            // If email does not exists in the database i.e. New user
            let currentUserUid = this.afAuth.auth.currentUser.uid; // Get 'currentUserUid'
            this.db.object(`users/${currentUserUid}`).update({
              email: data.user.email,
              name: data.user.displayName
            });
            console.log('New data info added to database');

            this.router.navigate(['/welcome']);
            /* Stop javascript's execution */
            throw new Error("Changing route to welcome screen for new user!");
          }

          else {
            // If user already exists
            this.router.navigate(['/profile']);
            console.log('Data info already exists in database');
            return;
          }
        })

        console.log(data.user.email)

      }).catch(
        (err) => {
          this.error = err;
      })
  }


  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      //console.log('callback - particles.js config loaded');
    });
  }

}
