import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  canActivate() {
      if(this.authService.getAuthenticated()) {
        return true;
      }
        console.log('Access denied!');
        this.router.navigate(['/login']);
        return false;
    }

}
