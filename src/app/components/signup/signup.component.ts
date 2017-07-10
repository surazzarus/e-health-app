import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import {moveIn, fallIn} from '../../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()]
})
export class SignupComponent implements OnInit {
  email: any;
  password: any;
  state: string = '';
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    db: AngularFireDatabase
  ) { }

  onSubmit() {

      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((success) => {
        //console.log(success);

        ///// Send Email to the registered users /////
        let user:any = firebase.auth().currentUser;
           user.sendEmailVerification().then(
             (success) => {console.log("please verify your email")}
           ).catch(
             (err) => {
               this.error = err;
             }
           )

        this.router.navigate(['/welcome'])
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
