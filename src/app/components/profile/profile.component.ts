import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: any;

  constructor(public afAuth: AngularFireAuth) {
    // shows the name
    this.afAuth.authState.subscribe(auth => {
      //console.log(auth)
      if(auth) {
        /* Show display name OR only name before '@' in email */
        this.name = auth.displayName || auth.email.split('@')[0];
        //console.log(auth.displayName);
      }
    })
  }

  ngOnInit() {
  }

}
