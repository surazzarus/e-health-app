import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    //this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});

    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
