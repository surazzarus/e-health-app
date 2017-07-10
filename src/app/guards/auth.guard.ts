import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
        return this.authService.authState$
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
              if (!authenticated) {
                  this.router.navigate(['login']);
              }
            });
    }


    /*
    canActivate(): Observable<boolean>{
      return this.authService.authState$
          .take(1)
          .map(authState => !!authState)
          .do(authenticated => {
            if (!authenticated) {
                this.router.navigate(['login']);
            }
          });
    }
    */


}
