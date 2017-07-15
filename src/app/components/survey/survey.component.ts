import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseService} from '../../shared/services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {
  users: FirebaseListObservable<User[]>;
  name: string;
  email: string;

  options:any = [
    {label: "I'd like to be fitter.", checked: false},
    {label: "I am often tired and exhausted.", checked: false},
    {label: "I have trouble concentrating.", checked: false},
    {label: "I find it difficult to motivate myself.", checked: false},
    {label: "I'm often stressed and tensed.", checked: false},
    {label: "I'd like to loose some weight.", checked: false},
    {label: "I'd like to be gain some muscles.", checked: false}
  ]

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.users = this.db.list('/users') as FirebaseListObservable<any[]>;
    this.afAuth.authState.subscribe(user => {
      if(user) {
        /* Show displayName OR only name before '@' in email */
        this.name = user.displayName || user.email.split('@')[0];

        this.email = user.email;
      }
    })
  }

  buttonState() {
   return !this.options.some(_ => _.checked);
  }

  bodyParts(parts) {
    console.log(parts);
  }

  // defining getter using 'get' typescript's property
  // get values of multiple checked checkboxes
  get saveSelected() {
    return this.options
        .filter(opt => opt.checked)
        .map(opt => opt.label)
  }

  onSaveChanges() {
    /***  Store survey options on the existing users collection  ***/
    let currentUserUid = this.afAuth.auth.currentUser.uid; // Get 'currentUserUid'
    this.db.object(`users/${currentUserUid}`).update({
      survey: this.saveSelected
    });
    this.router.navigate(['listings']);

    /*
    this.users.push({
      email: this.email,  // Get current user's email
      options: this.saveSelected  // Get the selected options from 'saveSelected'
    })
    */
  }

  ngOnInit() {
    // Check if email is verified
    if(this.afAuth.auth.currentUser.emailVerified) {
      let currentUserUid = this.afAuth.auth.currentUser.uid;
      this.db.object(`users/${currentUserUid}`).update({
        emailVerified: true
      });
    }
    else {
      let currentUserUid = this.afAuth.auth.currentUser.uid;
      this.db.object(`users/${currentUserUid}`).update({
        emailVerified: false
      });
    }
  }


  ngOnDestroy(){
    //this.db.list("/users").push({"email": localStorage.getItem("email")});
  }

}
