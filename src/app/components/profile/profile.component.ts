import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: any;

  checkboxes:any = [
    {label: "I'd like to be fitter."},
    {label: "I am often tired and exhausted."},
    {label: "I have trouble concentrating."},
    {label: "I find it difficult to motivate myself."},
    {label: "I'm often stressed and tensed."},
    {label: "I'd like to loose some weight."},
    {label: "I'd like to be gain some muscles."}
  ]

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    // shows the name
    this.afAuth.authState.subscribe(user => {
      //console.log(auth)
      if(user) {
        /* Show display name OR only name before '@' in email */
        this.name = user.displayName || user.email.split('@')[0];
        //console.log(user.uid);
      }
    })
  }

  buttonState() {
   return !this.checkboxes.some(_ => _.state);
  }

  bodyParts(parts) {
    console.log(parts);
  }

  onSaveChanges() {
    this.router.navigate(['listings']);
  }

  ngOnInit() {
  }

}
