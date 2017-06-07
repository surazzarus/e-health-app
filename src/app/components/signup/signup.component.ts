import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
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
  state: string = '';
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) { }

  /*
  onSubmit(formData) {
    //console.log(formData.value)
    this.authService.signup(formData.value.email, formData.value.password);
  }
  */


  onSubmit(formData) {
    if(formData.valid) {
      //console.log(formData.value);
      console.log(formData.valid);
      //console.log(this.afAuth.auth);
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
        //console.log(success);
        this.router.navigate(['/listings'])
      }).catch(
        (err) => {
        //console.log(err);
        this.error = err.message;
      })
    }
  }


  ngOnInit() {
  }

}
