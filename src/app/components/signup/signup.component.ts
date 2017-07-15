import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import {moveIn, fallIn} from '../../router.animations';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()]
})
export class SignupComponent implements OnInit {

  users: FirebaseListObservable<User[]>;
  name: string;
  email: string;
  password: string;
  state: string = '';
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;

    console.log(this.users)


  }

  onSubmit() {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          let currentUserUid = this.afAuth.auth.currentUser.uid; // Get current user 'id'
          // Overwriting auto generated keys with 'currentUserUid', so that we can use that id to add more collections later on
          this.db.object(`users/${currentUserUid}`).update({
            name: this.name,
            email: data.email // Getting email from 'createUserWithEmailAndPassword' method
          })
        /*
        this.users.push({
          name: this.name,
          username: this.username,
          // Getting email from 'createUserWithEmailAndPassword' method
          email: data.email
        })
        */

        this.router.navigate(['/welcome'])
        console.log(data.email);

        ///// Send Email to user after registration is done /////
        let user:any = firebase.auth().currentUser; // Get current user
           user.sendEmailVerification().then(
             (success) => {console.log("please verify your email")}
           ).catch(
             (err) => {
               this.error = err;
             }
           )

      }).catch(
        (err) => {
        console.log(err);
        this.error = err.message;
      })
  }

  /*
  onSubmit(formData) {
    if(formData.valid) {
      //console.log(formData.valid);
      //console.log(this.afAuth.auth);
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
        //console.log(success);

        this.router.navigate(['/profile'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err.message;
      })
    }
  }
  */


  ngOnInit() {
  }

}
