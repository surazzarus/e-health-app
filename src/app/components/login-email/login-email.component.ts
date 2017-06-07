import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import {moveIn, fallIn} from '../../router.animations';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css'],
  animations: [moveIn(), fallIn()]
})
export class LoginEmailComponent implements OnInit {
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/listings']);
      }).catch(
        (err) => {
        console.log(err);
        if(err.message == "The password is invalid or the user does not have a password.") {
          this.error = "Invalid Password";
        }else {
          this.error = err.message;
        }
      })
    }
  }

  ngOnInit() {
  }

}
