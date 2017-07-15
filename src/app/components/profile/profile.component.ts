import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    // Get Current User
    let currentUserUid = this.afAuth.auth.currentUser.uid; // Get 'currentUserUid'
    this.db.object(`users/${currentUserUid}`).subscribe(user =>{
      this.name = user.name;
    })

    /*
    // Displaying current name
    this.afAuth.authState.subscribe(user => {
      //console.log(auth)
      if(user) {
        /// Show display name OR only name before '@' in email ////
        this.name = user.displayName || user.email.split('@')[0];
        //console.log(user.uid);
      }
    })
    */
  }

  ngOnInit() {

  }

}
